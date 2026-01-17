"use client";

import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { MessageCircle, CheckCircle, Lock } from 'lucide-react';
import PlaceOrderButton from './ui/place-order-button';

interface CheckoutModalProps {
    show: boolean;
    onHide: () => void;
}

export default function CheckoutModal({ show, onHide }: CheckoutModalProps) {
    const { cartItems, addOrder } = useCart();
    const { user, setIsAuthModalOpen } = useAuth();
    const [step, setStep] = useState<'form' | 'success'>('form');
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        phone: '',
    });

    useEffect(() => {
        if (user) {
            setFormData(prev => ({
                ...prev,
                name: user.name || prev.name,
                phone: user.mobile || user.email || prev.phone
            }));
        } else {
            // Load saved user data from old checkout (fallback)
            const savedUser = localStorage.getItem('user_info');
            if (savedUser) {
                setFormData(JSON.parse(savedUser));
            }
        }
    }, [user]);

    const total = cartItems.reduce((acc, item) => {
        const priceStr = item.price.replace('₹', '').replace('$', '').replace(',', '');
        return acc + (parseFloat(priceStr) * item.quantity);
    }, 0);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Save user details for next time
        localStorage.setItem('user_info', JSON.stringify(formData));

        // 1. Create Order Data
        const orderData = {
            customer: formData,
            items: cartItems,
            total: `₹${total}`,
            status: 'Pending'
        };

        // 2. Save to Admin History (Simulation)
        addOrder(orderData);

        // 3. Construct WhatsApp Message
        const itemsList = cartItems.map((item, i) => `${i + 1}. ${item.name} x${item.quantity} (${item.price}) [Size: ${item.size || 'N/A'}]`).join('%0a');
        const message = `*R Style - New Order* 🛍️%0a%0a*Customer:* ${formData.name}%0a*Address:* ${formData.address}%0a*Phone:* ${formData.phone}%0a%0a*Items:*%0a${itemsList}%0a%0a*Total: ₹${total}*`;

        // 4. Open WhatsApp (Store Number: 918758424155)
        const storeNumber = "918758424155";
        window.open(`https://wa.me/${storeNumber}?text=${message}`, '_blank');

        // 5. Show Success
        setStep('success');
    };

    const handleClose = () => {
        onHide();
        setStep('form'); // Reset for next time
    };

    const handleLoginClick = () => {
        onHide();
        setIsAuthModalOpen(true);
    };

    return (
        <Modal show={show} onHide={handleClose} centered className="auth-modal-transparent">
            <Modal.Header closeButton style={{
                background: '#111111',
                borderBottom: '1px solid rgba(255, 63, 108, 0.3)',
                color: '#ffffff'
            }} className="dark-close-button">
                <Modal.Title style={{ fontWeight: 700, color: '#ffffff' }}>
                    {step === 'form' ? 'Checkout' : 'Order Placed!'}
                </Modal.Title>
            </Modal.Header>

            <Modal.Body style={{ padding: '24px', background: '#000000', color: '#ffffff' }}>
                {!user ? (
                    <div className="text-center py-4">
                        <div className="mb-3">
                            <Lock size={48} color="#ff3f6c" />
                        </div>
                        <h5 style={{ fontWeight: 700, color: '#ffffff', marginBottom: '12px' }}>Login Required</h5>
                        <p style={{ color: '#aaaaaa', fontSize: '14px', marginBottom: '24px' }}>
                            Please login with your mobile number to place an order.
                        </p>
                        <Button
                            onClick={handleLoginClick}
                            style={{
                                width: '100%',
                                background: '#ff3f6c',
                                border: 'none',
                                padding: '12px',
                                fontWeight: 700,
                                textTransform: 'uppercase',
                                borderRadius: '8px'
                            }}
                        >
                            Login / Signup
                        </Button>
                    </div>
                ) : (
                    <>
                        {step === 'form' ? (
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label style={{ fontWeight: 600, color: '#ffffff', fontSize: '14px' }}>Full Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        required
                                        placeholder="Enter your name"
                                        style={{ background: '#111111', border: '1px solid #333', borderRadius: '8px', padding: '12px', color: '#fff' }}
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                        className="custom-input"
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label style={{ fontWeight: 600, color: '#ffffff', fontSize: '14px' }}>Delivery Address</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={2}
                                        required
                                        placeholder="Enter your full address"
                                        style={{ background: '#111111', border: '1px solid #333', borderRadius: '8px', padding: '12px', color: '#fff' }}
                                        value={formData.address}
                                        onChange={e => setFormData({ ...formData, address: e.target.value })}
                                        className="custom-input"
                                    />
                                </Form.Group>

                                <Form.Group className="mb-4">
                                    <Form.Label style={{ fontWeight: 600, color: '#ffffff', fontSize: '14px' }}>Phone Number / Email</Form.Label>
                                    <Form.Control
                                        type="text"
                                        required
                                        readOnly={!!(user?.mobile || user?.email)} // Verified user cannot change ID
                                        style={{ background: '#1a1a1a', border: '1px solid #333', borderRadius: '8px', padding: '12px', color: '#ff3f6c', opacity: 0.8 }}
                                        value={formData.phone}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, phone: e.target.value })}
                                    />
                                </Form.Group>

                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    padding: '16px',
                                    background: '#111111',
                                    borderRadius: '8px',
                                    marginBottom: '20px',
                                    border: '1px solid rgba(255, 63, 108, 0.2)'
                                }}>
                                    <span style={{ color: '#aaaaaa', fontWeight: 600 }}>Total Amount:</span>
                                    <span style={{ color: '#ff3f6c', fontWeight: 700, fontSize: '20px' }}>₹{total}</span>
                                </div>

                                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
                                    <PlaceOrderButton onOrderPlaced={() => {
                                        // Build WhatsApp message
                                        const itemsList = cartItems.map(item =>
                                            `- ${item.name} (x${item.quantity}) - ${item.price}`
                                        ).join('%0A');

                                        const message = `🛍️ *New Order from R Style*%0A%0A` +
                                            `*Customer Details:*%0A` +
                                            `Name: ${formData.name}%0A` +
                                            `Phone: ${formData.phone}%0A` +
                                            `Address: ${formData.address}%0A%0A` +
                                            `*Order Items:*%0A${itemsList}%0A%0A` +
                                            `*Total: ₹${total}*`;

                                        window.open(`https://wa.me/918758424155?text=${message}`, '_blank');
                                        setStep('success');
                                    }} />
                                </div>
                            </Form >
                        ) : (
                            <div style={{ textAlign: 'center', padding: '32px 0' }}>
                                <CheckCircle size={64} color="#ff3f6c" style={{ marginBottom: '16px' }} />
                                <h4 style={{ color: '#ffffff', fontWeight: 700 }}>Thank You, {formData.name}!</h4>
                                <p style={{ color: '#aaaaaa' }}>Your order has been sent to our team via WhatsApp.</p>
                                <Button
                                    onClick={handleClose}
                                    className="btn-myntra-outline mt-3"
                                    style={{ borderColor: '#ff3f6c', color: '#ff3f6c' }}
                                    suppressHydrationWarning
                                >
                                    Continue Shopping
                                </Button>
                            </div>
                        )
                        }
                    </>
                )}
                <style>{`
                    .custom-input::placeholder { color: #555 !important; }
                    .dark-close-button .btn-close { filter: invert(1) grayscale(100%) brightness(200%); }
                `}</style>
            </Modal.Body >
        </Modal >
    );
}
