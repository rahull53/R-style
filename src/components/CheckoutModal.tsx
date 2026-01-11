"use client";

import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { MessageCircle, CheckCircle, Lock } from 'lucide-react';

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
                phone: user.mobile || prev.phone
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

        // 4. Open WhatsApp (Replace with Store Number)
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
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton style={{ borderBottom: '1px solid #d4d5d9' }}>
                <Modal.Title style={{ fontWeight: 700, color: '#282c3f' }}>
                    {step === 'form' ? 'Checkout' : 'Order Placed!'}
                </Modal.Title>
            </Modal.Header>

            <Modal.Body style={{ padding: '24px' }}>
                {!user ? (
                    <div className="text-center py-4">
                        <div className="mb-3">
                            <Lock size={48} color="#ff3f6c" />
                        </div>
                        <h5 style={{ fontWeight: 700, color: '#282c3f', marginBottom: '12px' }}>Login Required</h5>
                        <p style={{ color: '#94969f', fontSize: '14px', marginBottom: '24px' }}>
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
                                textTransform: 'uppercase'
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
                                    <Form.Label style={{ fontWeight: 600, color: '#282c3f', fontSize: '14px' }}>Full Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        required
                                        placeholder="Enter your name"
                                        style={{ border: '1px solid #d4d5d9', borderRadius: '4px', padding: '12px' }}
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label style={{ fontWeight: 600, color: '#282c3f', fontSize: '14px' }}>Delivery Address</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={2}
                                        required
                                        placeholder="Enter your full address"
                                        style={{ border: '1px solid #d4d5d9', borderRadius: '4px', padding: '12px' }}
                                        value={formData.address}
                                        onChange={e => setFormData({ ...formData, address: e.target.value })}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-4">
                                    <Form.Label style={{ fontWeight: 600, color: '#282c3f', fontSize: '14px' }}>Phone Number</Form.Label>
                                    <Form.Control
                                        type="tel"
                                        required
                                        readOnly // Phone is locked to verified user
                                        style={{ border: '1px solid #d4d5d9', borderRadius: '4px', padding: '12px', background: '#f5f5f6' }}
                                        value={formData.phone}
                                    />
                                </Form.Group>

                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    padding: '16px',
                                    background: '#f5f5f6',
                                    borderRadius: '4px',
                                    marginBottom: '20px'
                                }}>
                                    <span style={{ color: '#94969f', fontWeight: 600 }}>Total Amount:</span>
                                    <span style={{ color: '#282c3f', fontWeight: 700, fontSize: '20px' }}>₹{total}</span>
                                </div>

                                <Button
                                    type="submit"
                                    className="w-100"
                                    style={{
                                        background: '#25D366',
                                        border: 'none',
                                        padding: '14px',
                                        fontWeight: 700,
                                        fontSize: '14px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '8px'
                                    }}
                                    suppressHydrationWarning
                                >
                                    <MessageCircle size={20} /> Place Order on WhatsApp
                                </Button>
                            </Form>
                        ) : (
                            <div style={{ textAlign: 'center', padding: '32px 0' }}>
                                <CheckCircle size={64} color="#03a685" style={{ marginBottom: '16px' }} />
                                <h4 style={{ color: '#282c3f', fontWeight: 700 }}>Thank You, {formData.name}!</h4>
                                <p style={{ color: '#94969f' }}>Your order has been sent to our team via WhatsApp.</p>
                                <Button
                                    onClick={handleClose}
                                    className="btn-myntra-outline mt-3"
                                    suppressHydrationWarning
                                >
                                    Continue Shopping
                                </Button>
                            </div>
                        )}
                    </>
                )}
            </Modal.Body>
        </Modal>
    );
}
