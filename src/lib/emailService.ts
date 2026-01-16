import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export async function sendOTPEmail(email: string, otp: string) {
    const htmlTemplate = `
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            .container {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                border: 1px solid #e0e0e0;
                border-radius: 8px;
                overflow: hidden;
            }
            .header {
                background-color: #000000;
                padding: 20px;
                text-align: center;
            }
            .content {
                padding: 40px 20px;
                text-align: center;
                color: #282c3f;
            }
            .otp-code {
                font-size: 40px;
                font-weight: bold;
                color: #ff3f6c;
                letter-spacing: 8px;
                margin: 20px 0;
                padding: 15px;
                background-color: #f9f9f9;
                border: 1px dashed #ff3f6c;
                display: inline-block;
            }
            .footer {
                background-color: #f5f5f6;
                padding: 20px;
                text-align: center;
                font-size: 12px;
                color: #94969f;
            }
            .btn {
                background-color: #ff3f6c;
                color: white;
                text-decoration: none;
                padding: 12px 24px;
                border-radius: 4px;
                font-weight: bold;
                display: inline-block;
                margin-top: 20px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1 style="color: #ff3f6c; margin: 0; letter-spacing: 2px;">R STYLE</h1>
            </div>
            <div class="content">
                <h2 style="margin-top: 0;">Verification Code</h2>
                <p>Hello,</p>
                <p>Use the following One-Time Password (OTP) to verify your account. This code is valid for <strong>10 minutes</strong>.</p>
                <div class="otp-code">${otp}</div>
                <p style="font-size: 14px; color: #535766;">If you didn't request this code, please ignore this email.</p>
            </div>
            <div class="footer">
                <p>&copy; 2026 R Style Fashion. All rights reserved.</p>
                <p>A-123, Fashion Hub, Mumbai, India</p>
            </div>
        </div>
    </body>
    </html>
    `;

    try {
        const info = await transporter.sendMail({
            from: `"R Style Verification" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: `${otp} is your R Style verification code`,
            html: htmlTemplate,
        });
        console.log('Email sent: %s', info.messageId);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error('Nodemailer Error:', error);
        return { success: false, error };
    }
}
