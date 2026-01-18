"use client";

import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useAuth } from '@/context/AuthContext';
import { Phone, Shield, ArrowRight, X, Loader2, User, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  
  .form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 1.5em 2em;
    background-color: #171717;
    border-radius: 25px;
    transition: 0.4s ease-in-out;
  }

  .card {
    background-image: linear-gradient(163deg, #ff3f6c 0%, #3700ff 100%);
    border-radius: 22px;
    transition: all 0.3s;
    padding: 3px;
    overflow: hidden; /* Fix for sub-pixel bleed/white line */
    border: none;
  }

  .card2 {
    background-color: #171717;
    border-radius: 20px;
    transition: all 0.2s;
  }

  .card2:hover {
    transform: scale(0.99);
  }

  .card:hover {
    box-shadow: 0px 0px 30px 1px rgba(255, 63, 108, 0.3);
  }

  .heading {
    text-align: center;
    margin: 1em 0;
    color: rgb(255, 255, 255);
    font-size: 1.4em;
    font-weight: 700;
  }

  .field {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5em;
    border-radius: 25px;
    padding: 0.8em;
    border: none;
    outline: none;
    color: white;
    background-color: #171717;
    box-shadow: inset 2px 5px 10px rgb(5, 5, 5);
    margin-bottom: 0.5em;
  }

  .input-icon {
    height: 1.3em;
    width: 1.3em;
    color: #ff3f6c;
    flex-shrink: 0;
  }

  .input-field {
    background: none;
    border: none;
    outline: none;
    width: 100%;
    color: #d3d3d3;
    font-size: 14px;
    &::placeholder {
        color: #666;
    }
  }

  .btn-wrapper {
    display: flex;
    justify-content: center;
    flex-direction: column;
    gap: 10px;
    margin-top: 1.5em;
  }

  .button-primary {
    padding: 0.8em;
    border-radius: 12px;
    border: none;
    outline: none;
    transition: 0.4s ease-in-out;
    background: linear-gradient(135deg, #ff3f6c 0%, #ff5a8a 50%, #ff80b0 100%);
    color: white;
    font-weight: 600;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    
    &:hover:not(:disabled) {
      background: linear-gradient(135deg, #e63860 0%, #ff5a8a 50%, #ff80b0 100%);
      transform: scale(1.02);
      color: white;
      box-shadow: 0 4px 15px rgba(255, 63, 108, 0.4);
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      background: #333;
    }
  }

  .button-secondary {
    padding: 0.5em;
    border-radius: 12px;
    border: none;
    outline: none;
    transition: 0.4s ease-in-out;
    background: none;
    color: #94969f;
    font-size: 12px;
    margin-top: 10px;

    &:hover {
      color: #ff3f6c;
      text-decoration: underline;
    }
  }

  .social-section {
    margin-top: 1.5em;
    text-align: center;
    border-top: 1px solid rgba(255, 255, 255, 0.05);
    padding-top: 1.2em;
  }

  .social-text {
    color: #666;
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 15px;
  }

  .parent {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .child {
    width: 45px;
    height: 45px;
    display: flex;
    justify-content: center;
    align-items: center;
    transform-style: preserve-3d;
    transition: all 0.3s cubic-bezier(0.68, 0.85, 0.265, 1.85);
    border-radius: 12px;
    margin: 0 8px;
    background-color: #252525;
    box-shadow: inset 1px 1px 2px rgba(255, 255, 255, 0.1), 0 0 5px rgba(0, 0, 0, 0.5);
  }

  .child:hover {
    background-color: white;
    transform: perspective(180px) rotateX(60deg) translateY(2px);
  }

  .child-3:hover { box-shadow: 0px 10px 15px #ffffff; }

  .social-btn {
    cursor: pointer;
    width: 100%;
    height: 100%;
    border: none;
    background-color: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
    transition-duration: 0.5s;
    transition-timing-function: cubic-bezier(0.68, -0.85, 0.265, 1.55);
  }

  .child:hover > .social-btn {
    transform: translate3d(0px, 15px, 25px) perspective(80px) rotateX(-60deg) translateY(2px) translateZ(5px);
  }

  .child-3 svg {
    fill: #ffffff;
    transition: fill 0.3s;
  }
  .child-3:hover svg {
    fill: #000000;
  }
`;


export default function AuthModal() {
    const { isAuthModalOpen, setIsAuthModalOpen, login } = useAuth();
    const [step, setStep] = useState<'mobile' | 'otp' | 'google'>('mobile');
    const [mobile, setMobile] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [otp, setOtp] = useState('');
    const [sessionId, setSessionId] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!isAuthModalOpen) {
            setStep('mobile');
            setMobile('');
            setEmail('');
            setName('');
            setOtp('');
            setSessionId('');
            setError('');
            setLoading(false);
        }
    }, [isAuthModalOpen]);

    const handleSendOtp = async () => {
        if (mobile.length !== 10) {
            setError('Please enter a valid 10-digit mobile number');
            return;
        }

        // Removed email check for mobile flow as requested by user

        setLoading(true);
        setError('');

        try {
            const response = await fetch('/api/send-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ mobile }) // Don't send email if not captured
            });

            const data = await response.json();

            if (data.success) {
                setSessionId(data.sessionId);
                setStep('otp');
            } else {
                throw new Error(data.error || 'Failed to send OTP');
            }
        } catch (err: any) {
            console.error("OTP Error:", err);
            setError(err.message || 'Failed to send OTP. Try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleSendEmailOtp = async () => {
        if (!name || name.length < 2) {
            setError('Please enter your name');
            return;
        }
        if (!email || !email.includes('@')) {
            setError('Please enter a valid Gmail');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const response = await fetch('/api/send-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, name })
            });

            const data = await response.json();

            if (data.success) {
                setSessionId(data.sessionId); // Usually email itself or returned ID
                setStep('otp');
            } else {
                throw new Error(data.error || 'Failed to send OTP to email');
            }
        } catch (err: any) {
            console.error("Email OTP Error:", err);
            setError(err.message || 'Failed to send OTP. Try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOtp = async () => {
        if (otp.length !== 6 || !sessionId) return;

        setLoading(true);
        setError('');

        try {
            const response = await fetch('/api/verify-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    mobile: step === 'otp' && mobile ? mobile : undefined,
                    email: step === 'otp' && email ? email : undefined,
                    otp,
                    sessionId
                })
            });

            const data = await response.json();

            if (data.success) {
                login(mobile || email, name);
                handleClose();
            } else {
                throw new Error(data.error || 'Invalid OTP. Please check and try again.');
            }
        } catch (err: any) {
            console.error("Verification Error:", err);
            setError(err.message || 'OTP verification failed. Try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        setIsAuthModalOpen(false);
    };

    return (
        <>
            <style dangerouslySetInnerHTML={{
                __html: `
            .auth-modal-transparent .modal-dialog {
                display: flex !important;
                justify-content: center !important;
                align-items: center !important;
                min-height: 100vh !important;
                margin: 0 auto !important;
                max-width: fit-content !important;
                border: none !important;
                outline: none !important;
                transform: none !important;
            }
            .auth-modal-transparent {
                overflow: hidden !important;
                padding-right: 0 !important;
            }
            /* FIX WHITE LINE */
            .modal-content { border: none !important; background: transparent !important; }
        `}} />
            <Modal
                show={isAuthModalOpen}
                onHide={handleClose}
                centered
                size="sm"
                backdrop="static"
                className="auth-modal-transparent"
            >
                <Modal.Body className="p-0" style={{ background: 'transparent', border: 'none' }}>
                    <StyledWrapper>
                        <div className="card">
                            <div className="card2">
                                <form className="form" onSubmit={(e) => e.preventDefault()}>
                                    {/* Close Button */}
                                    <button
                                        onClick={handleClose}
                                        style={{
                                            position: 'absolute',
                                            top: '15px',
                                            right: '20px',
                                            background: 'rgba(255,255,255,0.05)',
                                            border: 'none',
                                            borderRadius: '50%',
                                            padding: '5px',
                                            cursor: 'pointer',
                                            zIndex: 10
                                        }}
                                    >
                                        <X size={18} color="#94969f" />
                                    </button>

                                    <AnimatePresence mode="wait">
                                        {step === 'mobile' ? (
                                            <motion.div
                                                key="mobile"
                                                initial={{ opacity: 0, scale: 0.95 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.95 }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                <p className="heading">Login / Signup</p>

                                                {/* Name Input */}
                                                <div className="field">
                                                    <User className="input-icon" size={16} />
                                                    <input
                                                        className="input-field"
                                                        type="text"
                                                        placeholder="Your Name (optional)"
                                                        value={name}
                                                        onChange={(e) => setName(e.target.value)}
                                                    />
                                                </div>

                                                {/* Mobile Input */}
                                                <div className="field">
                                                    <Phone className="input-icon" size={16} />
                                                    <div style={{ color: '#ff3f6c', fontWeight: 600, fontSize: '14px', marginRight: '5px' }}>+91</div>
                                                    <input
                                                        className="input-field"
                                                        type="tel"
                                                        placeholder="Mobile Number"
                                                        value={mobile}
                                                        onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                                                    />
                                                </div>

                                                {/* Hidden Email for Mobile Flow (optional for update later) */}

                                                {error && <p style={{ color: '#ff3f6c', fontSize: '11px', marginBottom: '10px', textAlign: 'center' }}>{error}</p>}

                                                <div className="btn-wrapper">
                                                    <button
                                                        className="button-primary"
                                                        onClick={handleSendOtp}
                                                        // Temporarily allow send OTP with just mobile. Backend might need update if email is strictly required. 
                                                        // Assuming backend handles optional email or we send a dummy one for phone-only users if needed.
                                                        // For now, I will modify handleSendOtp to not require email if phone is present, OR I'll auto-generate one.
                                                        // Actually, user said REMOVE IT. So let's check handleSendOtp logic.
                                                        disabled={loading || mobile.length !== 10}
                                                    >
                                                        {loading ? <Loader2 size={18} className="animate-spin" /> : 'Get OTP'}
                                                        {!loading && <ArrowRight size={16} />}
                                                    </button>
                                                </div>

                                                <p style={{ textAlign: 'center', fontSize: '10px', color: '#666', marginTop: '1.5em' }}>
                                                    By continuing, you agree to our Terms & Conditions
                                                </p>

                                                {/* Social Buttons Sections */}
                                                <div className="social-section">
                                                    <p className="social-text">Or continue with</p>
                                                    <div className="parent">
                                                        <div className="child child-3">
                                                            <button className="social-btn" onClick={() => setStep('google')}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" height="1.4em" viewBox="0 0 488 512">
                                                                    <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ) : step === 'google' ? (
                                            <motion.div
                                                key="google"
                                                initial={{ opacity: 0, scale: 0.95 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.95 }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                <p className="heading">Gmail Verification</p>

                                                {/* Name Input */}
                                                <div className="field">
                                                    <User className="input-icon" size={16} />
                                                    <input
                                                        className="input-field"
                                                        type="text"
                                                        placeholder="Your Name"
                                                        value={name}
                                                        onChange={(e) => setName(e.target.value)}
                                                    />
                                                </div>

                                                {/* Email Input */}
                                                <div className="field">
                                                    <Mail className="input-icon" size={16} />
                                                    <input
                                                        className="input-field"
                                                        type="email"
                                                        placeholder="Gmail Address"
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value.trim())}
                                                    />
                                                </div>

                                                {error && <p style={{ color: '#ff3f6c', fontSize: '11px', marginBottom: '10px', textAlign: 'center' }}>{error}</p>}

                                                <div className="btn-wrapper">
                                                    <button
                                                        className="button-primary"
                                                        onClick={handleSendEmailOtp}
                                                        disabled={loading || !name || !email.includes('@')}
                                                    >
                                                        {loading ? <Loader2 size={18} className="animate-spin" /> : 'Get OTP'}
                                                        {!loading && <ArrowRight size={16} />}
                                                    </button>

                                                    <button
                                                        type="button"
                                                        className="button-secondary"
                                                        onClick={() => setStep('mobile')}
                                                    >
                                                        Use Mobile OTP Instead?
                                                    </button>
                                                </div>
                                            </motion.div>
                                        ) : (
                                            <motion.div
                                                key="otp"
                                                initial={{ opacity: 0, scale: 0.95 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.95 }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                <p className="heading">Verify OTP</p>
                                                <p style={{ fontSize: '11px', color: '#94969f', textAlign: 'center', marginBottom: '1.5em', lineHeight: '1.4' }}>
                                                    Sent to <span style={{ color: 'white' }}>
                                                        {mobile ? `+91 ${mobile.slice(0, 2)}******${mobile.slice(-2)}` : email}
                                                    </span>
                                                </p>

                                                {/* OTP Input */}
                                                <div className="field">
                                                    <Shield className="input-icon" size={16} />
                                                    <input
                                                        className="input-field"
                                                        type="text"
                                                        maxLength={6}
                                                        placeholder="6-digit OTP"
                                                        value={otp}
                                                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                                                        style={{ letterSpacing: '4px', textAlign: 'center', fontWeight: 'bold', fontSize: '16px' }}
                                                    />
                                                </div>

                                                {error && <p style={{ color: '#ff3f6c', fontSize: '11px', marginBottom: '10px', textAlign: 'center' }}>{error}</p>}

                                                <div className="btn-wrapper">
                                                    <button
                                                        className="button-primary"
                                                        onClick={handleVerifyOtp}
                                                        disabled={loading || otp.length !== 6}
                                                    >
                                                        {loading ? <Loader2 size={18} className="animate-spin" /> : 'Verify & Login'}
                                                        {!loading && <ArrowRight size={16} />}
                                                    </button>

                                                    <button
                                                        type="button"
                                                        className="button-secondary"
                                                        onClick={() => setStep('mobile')}
                                                    >
                                                        Change Mobile Number?
                                                    </button>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </form>
                            </div>
                        </div>
                    </StyledWrapper>
                </Modal.Body>
            </Modal>
        </>
    );
}
