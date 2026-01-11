const { createServer } = require('https');
const { parse } = require('url');
const next = require('next');
const fs = require('fs');
const path = require('path');
const os = require('os');
const { execSync } = require('child_process');

const dev = process.env.NODE_ENV !== 'production';
const hostname = '0.0.0.0';
const port = 3000;

// Certificate paths
const certPath = path.join(__dirname, 'cert.pem');
const keyPath = path.join(__dirname, 'key.pem');
const caCertPath = path.join(__dirname, 'ca.pem');
const caKeyPath = path.join(__dirname, 'ca.key');
const caSerialPath = path.join(__dirname, 'ca.srl');
const opensslConfigPath = path.join(__dirname, 'openssl.conf');

// Get network IP address
function getNetworkIP() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return null;
}

// Generate a root CA and server cert signed by that CA (so it can be trusted)
function generateCertificates() {
  if (fs.existsSync(certPath) && fs.existsSync(keyPath) && fs.existsSync(caCertPath) && fs.existsSync(caKeyPath)) {
    return;
  }

  console.log('🔐 Generating root CA and server certificate with OpenSSL...');

  const networkIP = getNetworkIP();
  console.log('Network IP detected:', networkIP || 'Not found');

  // Locate OpenSSL (Git for Windows ships with one)
  let opensslPath = 'openssl';
  const gitOpenSSL = 'C:\\Program Files\\Git\\usr\\bin\\openssl.exe';
  if (fs.existsSync(gitOpenSSL)) {
    opensslPath = gitOpenSSL;
  }

  // Write OpenSSL config with SANs
  const configContent = `[ req ]
distinguished_name = req_distinguished_name
req_extensions = v3_req
prompt = no

[ req_distinguished_name ]
CN = localhost

[ v3_req ]
basicConstraints = CA:FALSE
keyUsage = nonRepudiation, digitalSignature, keyEncipherment
extendedKeyUsage = serverAuth, clientAuth
subjectAltName = @alt_names

[ alt_names ]
DNS.1 = localhost
IP.1 = 127.0.0.1${networkIP ? `\nIP.2 = ${networkIP}` : ''}
`;
  fs.writeFileSync(opensslConfigPath, configContent);

  try {
    // 1) Generate CA key + cert
    if (!fs.existsSync(caKeyPath) || !fs.existsSync(caCertPath)) {
      console.log('Creating root CA...');
      execSync(`"${opensslPath}" genrsa -out "${caKeyPath}" 2048`, { stdio: 'inherit' });
      execSync(`"${opensslPath}" req -x509 -new -nodes -key "${caKeyPath}" -sha256 -days 825 -out "${caCertPath}" -subj "/CN=ModernShop Dev CA"`, { stdio: 'inherit' });
    }

    // 2) Generate server key
    console.log('Generating server private key...');
    execSync(`"${opensslPath}" genrsa -out "${keyPath}" 2048`, { stdio: 'inherit' });

    // 3) Generate CSR using SAN config
    const csrPath = path.join(__dirname, 'cert.csr');
    console.log('Creating certificate signing request...');
    execSync(`"${opensslPath}" req -new -key "${keyPath}" -out "${csrPath}" -config "${opensslConfigPath}"`, { stdio: 'inherit' });

    // 4) Sign server cert with CA
    console.log('Signing server certificate with root CA...');
    execSync(
      `"${opensslPath}" x509 -req -in "${csrPath}" -CA "${caCertPath}" -CAkey "${caKeyPath}" -CAcreateserial -out "${certPath}" -days 365 -sha256 -extensions v3_req -extfile "${opensslConfigPath}"`,
      { stdio: 'inherit' }
    );

    // Cleanup CSR and serial if present
    try {
      fs.unlinkSync(csrPath);
    } catch (_) { }

    console.log('✅ SSL certificates generated successfully!');
    console.log('✅ SANs include localhost, 127.0.0.1' + (networkIP ? `, ${networkIP}` : ''));
    console.log('⚠️  Note: Import ca.pem into Trusted Root Certification Authorities to remove browser warnings.');
  } catch (error) {
    console.error('❌ Error generating certificates:', error.message);
    throw error;
  } finally {
    // Clean up openssl config
    try {
      fs.unlinkSync(opensslConfigPath);
    } catch (_) { }
  }
}

// Generate certificates and start server
(() => {
  generateCertificates();

  const httpsOptions = {
    key: fs.readFileSync(keyPath),
    cert: fs.readFileSync(certPath),
    ca: fs.readFileSync(caCertPath),
  };

  const app = next({ dev, hostname, port });
  const handle = app.getRequestHandler();

  app.prepare().then(() => {
    createServer(httpsOptions, async (req, res) => {
      try {
        const parsedUrl = parse(req.url, true);
        await handle(req, res, parsedUrl);
      } catch (err) {
        console.error('Error occurred handling', req.url, err);
        res.statusCode = 500;
        res.end('internal server error');
      }
    }).listen(port, hostname, (err) => {
      if (err) throw err;
      const networkIP = getNetworkIP();
      console.log(`\n🚀 Ready on https://${networkIP || 'localhost'}:${port}`);
      console.log(`🌐 Network: https://${networkIP}:${port}`);
      console.log(`\n⚠️  Import ca.pem into Trusted Root Certification Authorities to remove browser warnings.\n`);
    });
  });
})();

