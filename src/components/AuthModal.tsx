"use client";

import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useAuth } from '@/context/AuthContext';
import { Phone, Shield, ArrowRight, X, Loader2 } from 'lucide-react';

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
        <Modal
            show={isAuthModalOpen}
            onHide={handleClose}
            centered
            size="sm"
            backdrop="static"
            keyboard={false}
        >
            <Modal.Body className="p-4">
                {/* Close Button */}
                <button
                    onClick={handleClose}
                    style={{
                        position: 'absolute',
                        top: '12px',
                        right: '12px',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        zIndex: 10
                    }}
                >
                    <X size={20} color="#94969f" />
                </button>

                <form onSubmit={(e) => e.preventDefault()} style={{ width: '100%' }}>
                    {step === 'mobile' ? (
                        <>
                            {/* Header */}
                            <div className="text-center mb-4">
                                <div
                                    className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3"
                                    style={{ width: '60px', height: '60px', background: '#fff0f3' }}
                                >
                                    <Phone size={28} color="#ff3f6c" />
                                </div>
                                <h4 style={{ fontWeight: 700, color: '#282c3f', marginBottom: '4px' }}>Login / Signup</h4>
                                <p style={{ fontSize: '14px', color: '#94969f' }}>Enter your mobile number to continue</p>
                            </div>

                            {/* Name Input */}
                            <div className="mb-3">
                                <input
                                    type="text"
                                    placeholder="Your Name (optional)"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '14px 16px',
                                        border: '1px solid #d4d5d9',
                                        borderRadius: '4px',
                                        fontSize: '14px',
                                        outline: 'none'
                                    }}
                                />
                            </div>

                            {/* Mobile Input */}
                            <div className="mb-3">
                                <div className="d-flex align-items-center" style={{ border: '1px solid #d4d5d9', borderRadius: '4px', overflow: 'hidden' }}>
                                    <span style={{ padding: '14px 12px', background: '#f5f5f6', color: '#282c3f', fontWeight: 600, fontSize: '14px' }}>+91</span>
                                    <input
                                        type="tel"
                                        placeholder="Mobile Number"
                                        value={mobile}
                                        onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                                        style={{
                                            flex: 1,
                                            padding: '14px 16px',
                                            border: 'none',
                                            fontSize: '14px',
                                            outline: 'none'
                                        }}
                                    />
                                </div>
                            </div>

                            {error && <p style={{ color: '#ff3f6c', fontSize: '12px', marginBottom: '12px' }}>{error}</p>}

                            {/* Send OTP Button */}
                            <Button
                                type="submit" // Can be submit now as form prevents default
                                onClick={handleSendOtp}
                                disabled={loading || mobile.length !== 10}
                                style={{
                                    width: '100%',
                                    background: '#ff3f6c',
                                    border: 'none',
                                    padding: '14px',
                                    fontWeight: 700,
                                    fontSize: '14px',
                                    textTransform: 'uppercase',
                                    borderRadius: '4px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '8px'
                                }}
                            >
                                {loading ? <Loader2 size={18} className="animate-spin" /> : 'Send OTP'}
                                {!loading && <ArrowRight size={16} />}
                            </Button>

                            <p className="text-center mt-3" style={{ fontSize: '12px', color: '#94969f' }}>
                                By continuing, you agree to our Terms & Conditions
                            </p>
                        </>
                    ) : (
                        <>
                            {/* OTP Verification Header */}
                            <div className="text-center mb-4">
                                <div
                                    className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3"
                                    style={{ width: '60px', height: '60px', background: '#e8f5e9' }}
                                >
                                    <Shield size={28} color="#4CAF50" />
                                </div>
                                <h4 style={{ fontWeight: 700, color: '#282c3f', marginBottom: '4px' }}>Verify with OTP</h4>
                                <p style={{ fontSize: '14px', color: '#94969f' }}>
                                    Sent to <span style={{ fontWeight: 600, color: '#282c3f' }}>+91 {mobile}</span>
                                </p>
                            </div>

                            {/* OTP Input */}
                            <div className="mb-4">
                                <input
                                    type="text"
                                    maxLength={6}
                                    placeholder="Enter 6-digit OTP"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                                    style={{
                                        width: '100%',
                                        padding: '14px 16px',
                                        border: '1px solid #d4d5d9',
                                        borderRadius: '4px',
                                        fontSize: '18px',
                                        textAlign: 'center',
                                        letterSpacing: '4px',
                                        fontWeight: '600',
                                        outline: 'none'
                                    }}
                                />
                            </div>

                            {error && <p style={{ color: '#ff3f6c', fontSize: '12px', marginBottom: '12px', textAlign: 'center' }}>{error}</p>}

                            {/* Verify OTP Button */}
                            <Button
                                type="submit" // Using submit type but controlled by form onSubmit if needed, or straight onClick
                                onClick={handleVerifyOtp}
                                disabled={loading || otp.length !== 6}
                                style={{
                                    width: '100%',
                                    background: '#4CAF50',
                                    border: 'none',
                                    padding: '14px',
                                    fontWeight: 700,
                                    fontSize: '14px',
                                    textTransform: 'uppercase',
                                    borderRadius: '4px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '8px'
                                }}
                            >
                                {loading ? <Loader2 size={18} className="animate-spin" /> : 'Verify OTP'}
                                {!loading && <ArrowRight size={16} />}
                            </Button>

                            {/* Back to Mobile Step */}
                            <div className="text-center mt-3">
                                <button
                                    type="button"
                                    onClick={() => setStep('mobile')}
                                    style={{ background: 'none', border: 'none', color: '#ff3f6c', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}
                                >
                                    Change Number?
                                </button>
                            </div>
                        </>
                    )}
                </form>
            </Modal.Body>
        </Modal>
    );
}
