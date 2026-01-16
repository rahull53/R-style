"use client";

import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useAuth } from '@/context/AuthContext';
import { Phone, Shield, ArrowRight, X, Loader2, User } from 'lucide-react';
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

  .btn-container {
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
    background-color: #252525;
    color: white;
    font-weight: 600;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    
    &:hover:not(:disabled) {
      background-color: #ff3f6c;
      color: white;
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
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
    }
  }

  .social-section {
    margin-top: 2em;
    text-align: center;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    padding-top: 1.5em;
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

  .child-1:hover { box-shadow: 0px 10px 15px #1e90ff; }
  .child-2:hover { box-shadow: 0px 10px 15px #ff00ff; }
  .child-3:hover { box-shadow: 0px 10px 15px #ffffff; }
  .child-4:hover { box-shadow: 0px 10px 15px #4267b2; }

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
    const [step, setStep] = useState<'mobile' | 'otp'>('mobile');
    const [mobile, setMobile] = useState('');
    const [name, setName] = useState('');
    const [otp, setOtp] = useState('');
    const [sessionId, setSessionId] = useState(''); // Store SessionId from 2Factor API
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!isAuthModalOpen) {
            setStep('mobile');
            setMobile('');
            setName('');
            setOtp('');
            setSessionId(''); // Reset sessionId
            setError('');
            setLoading(false);
        }
    }, [isAuthModalOpen]);

    const handleSendOtp = async () => {
        if (mobile.length !== 10) {
            setError('Please enter a valid 10-digit mobile number');
            return;
        }

        setLoading(true);
        setError('');

        try {
            // Call our API to send SMS (uses the updated /api/send-otp from previous message)
            const response = await fetch('/api/send-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ mobile }) // Only send mobile number now
            });

            const data = await response.json();

            if (data.success) {
                setSessionId(data.sessionId); // Store the received SessionId
                setStep('otp');
            } else {
                throw new Error(data.error || 'Failed to send SMS');
            }
        } catch (err: any) {
            console.error("SMS Error:", err);
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
            // Call a new API route to verify the OTP using SessionId
            const response = await fetch('/api/verify-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ mobile, otp, sessionId })
            });

            const data = await response.json();

            if (data.success) {
                // Success: Login user and close modal
                login(mobile, name);
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
            .auth-modal-transparent .modal-content {
                background: transparent !important;
                border: none !important;
                box-shadow: none !important;
            }
            .auth-modal-transparent .modal-dialog {
                display: flex !important;
                justify-content: center !important;
                align-items: center !important;
                min-height: 100vh !important;
                margin: 0 auto !important;
                max-width: fit-content !important;
                border: none !important;
                outline: none !important;
            }
            .auth-modal-transparent {
                overflow: hidden !important;
                padding-right: 0 !important;
            }
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

                                                {error && <p style={{ color: '#ff3f6c', fontSize: '11px', marginBottom: '10px', textAlign: 'center' }}>{error}</p>}

                                                <div className="btn-container">
                                                    <button
                                                        className="button-primary"
                                                        onClick={handleSendOtp}
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
                                                        <div className="child child-1">
                                                            <button className="social-btn">
                                                                <svg xmlns="http://www.w3.org/2000/svg" height="1.2em" viewBox="0 0 512 512" fill="#1e90ff">
                                                                    <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z" />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                        <div className="child child-2">
                                                            <button className="social-btn">
                                                                <svg xmlns="http://www.w3.org/2000/svg" height="1.2em" viewBox="0 0 448 512" fill="#ff00ff">
                                                                    <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                        <div className="child child-3">
                                                            <button className="social-btn">
                                                                <svg xmlns="http://www.w3.org/2000/svg" height="1.2em" viewBox="0 0 496 512">
                                                                    <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                        <div className="child child-4">
                                                            <button className="social-btn">
                                                                <svg xmlns="http://www.w3.org/2000/svg" height="1.2em" viewBox="0 0 320 512" fill="#4267B2">
                                                                    <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </div>
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
                                                <p style={{ fontSize: '12px', color: '#94969f', textAlign: 'center', marginBottom: '1.5em' }}>
                                                    Sent to <span style={{ color: 'white', fontWeight: 600 }}>+91 {mobile}</span>
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

                                                <div className="btn-container">
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
