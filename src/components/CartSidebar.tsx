"use client";

import { X, Trash2, ShoppingBag, Plus, Minus } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import Button from 'react-bootstrap/Button';
import { motion, AnimatePresence } from 'framer-motion';

export default function CartSidebar() {
    const { cartItems, removeFromCart, updateQuantity, isCartOpen, setIsCartOpen, setIsCheckoutOpen } = useCart();

    const total = cartItems.reduce((acc, item) => {
        const priceStr = item.price.replace('₹', '').replace('$', '').replace(',', '');
        return acc + (parseFloat(priceStr) * item.quantity);
    }, 0);

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    {/* Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: 'rgba(0,0,0,0.5)',
                            zIndex: 1040,
                            backdropFilter: 'blur(2px)'
                        }}
                        onClick={() => setIsCartOpen(false)}
                    />

                    {/* Sidebar */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        style={{
                            position: 'fixed',
                            top: 0,
                            right: 0,
                            width: '400px',
                            maxWidth: '100%',
                            height: '100dvh',
                            maxHeight: '-webkit-fill-available',
                            background: '#111111',
                            zIndex: 1050,
                            display: 'flex',
                            flexDirection: 'column',
                            boxShadow: '-4px 0 30px rgba(0,0,0,0.5)',
                            paddingBottom: 'env(safe-area-inset-bottom, 0)',
                            borderLeft: '1px solid rgba(255, 63, 108, 0.2)'
                        }}
                    >
                        {/* Header */}
                        <div style={{
                            padding: '20px',
                            borderBottom: '1px solid rgba(255, 63, 108, 0.1)',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            background: '#1a1a1a'
                        }}>
                            <h5 style={{ margin: 0, fontWeight: 700, color: '#ffffff' }}>
                                <ShoppingBag size={20} style={{ marginRight: '8px', color: '#ff3f6c' }} />
                                Shopping Bag ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})
                            </h5>
                            <button
                                onClick={() => setIsCartOpen(false)}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    padding: '4px'
                                }}
                            >
                                <X size={24} color="#ffffff" />
                            </button>
                        </div>

                        {/* Cart Items */}
                        <div style={{ flex: 1, overflow: 'auto', padding: '16px' }}>
                            {cartItems.length === 0 ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    style={{
                                        textAlign: 'center',
                                        padding: '48px 20px',
                                        color: '#aaaaaa'
                                    }}
                                >
                                    <ShoppingBag size={48} color="#ff3f6c" style={{ marginBottom: '16px', opacity: 0.3 }} />
                                    <p style={{ fontWeight: 600, color: '#ffffff' }}>Your bag is empty!</p>
                                    <p style={{ fontSize: '14px' }}>Add items to start shopping</p>
                                </motion.div>
                            ) : (
                                <AnimatePresence mode="popLayout">
                                    {cartItems.map((item) => (
                                        <motion.div
                                            layout
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20, scale: 0.9 }}
                                            key={item.id}
                                            style={{
                                                display: 'flex',
                                                gap: '12px',
                                                padding: '16px 0',
                                                borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
                                            }}
                                        >
                                            <div style={{
                                                width: '80px',
                                                height: '100px',
                                                background: '#1a1a1a',
                                                borderRadius: '4px',
                                                overflow: 'hidden'
                                            }}>
                                                {item.image && (
                                                    <img
                                                        src={item.image}
                                                        alt={item.name}
                                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                    />
                                                )}
                                            </div>
                                            <div style={{ flex: 1 }}>
                                                <h6 style={{
                                                    margin: '0 0 4px',
                                                    fontWeight: 600,
                                                    color: '#ffffff',
                                                    fontSize: '14px'
                                                }}>
                                                    {item.name}
                                                </h6>
                                                <p style={{
                                                    margin: '0 0 8px',
                                                    fontWeight: 700,
                                                    color: '#ff3f6c'
                                                }}>
                                                    {item.price}
                                                </p>
                                                {/* Quantity Selector */}
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, -1)}
                                                        style={{
                                                            width: '28px',
                                                            height: '28px',
                                                            background: '#1a1a1a',
                                                            border: '1px solid #333',
                                                            borderRadius: '4px',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            cursor: item.quantity <= 1 ? 'not-allowed' : 'pointer',
                                                            opacity: item.quantity <= 1 ? 0.5 : 1
                                                        }}
                                                        disabled={item.quantity <= 1}
                                                    >
                                                        <Minus size={14} color="#ffffff" />
                                                    </button>
                                                    <span style={{ fontWeight: 600, minWidth: '20px', textAlign: 'center', color: '#ffffff' }}>{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, 1)}
                                                        style={{
                                                            width: '28px',
                                                            height: '28px',
                                                            background: '#1a1a1a',
                                                            border: '1px solid #333',
                                                            borderRadius: '4px',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            cursor: item.quantity >= 10 ? 'not-allowed' : 'pointer',
                                                            opacity: item.quantity >= 10 ? 0.5 : 1
                                                        }}
                                                        disabled={item.quantity >= 10}
                                                    >
                                                        <Plus size={14} color="#ffffff" />
                                                    </button>
                                                </div>
                                                <button
                                                    onClick={() => removeFromCart(item.id)}
                                                    style={{
                                                        background: 'none',
                                                        border: 'none',
                                                        color: '#ff3f6c',
                                                        fontSize: '12px',
                                                        fontWeight: 600,
                                                        cursor: 'pointer',
                                                        padding: 0,
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '4px'
                                                    }}
                                                >
                                                    <Trash2 size={14} /> Remove
                                                </button>
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            )}
                        </div>

                        {/* Footer */}
                        {cartItems.length > 0 && (
                            <div style={{
                                padding: '16px 20px',
                                paddingBottom: 'max(16px, env(safe-area-inset-bottom, 16px))',
                                borderTop: '1px solid rgba(255, 63, 108, 0.2)',
                                background: '#111111',
                                flexShrink: 0
                            }}>
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    marginBottom: '16px'
                                }}>
                                    <span style={{ color: '#aaaaaa', fontWeight: 600 }}>Total</span>
                                    <span style={{ color: '#ff3f6c', fontWeight: 700, fontSize: '18px' }}>₹{total}</span>
                                </div>
                                <Button
                                    className="btn-myntra w-100"
                                    onClick={() => {
                                        setIsCartOpen(false);
                                        setIsCheckoutOpen(true);
                                    }}
                                    suppressHydrationWarning
                                >
                                    PLACE ORDER
                                </Button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
