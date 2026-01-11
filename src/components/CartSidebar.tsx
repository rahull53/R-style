"use client";

import { X, Trash2, ShoppingBag, Plus, Minus } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import Button from 'react-bootstrap/Button';

export default function CartSidebar() {
    const { cartItems, removeFromCart, updateQuantity, isCartOpen, setIsCartOpen, setIsCheckoutOpen } = useCart();

    const total = cartItems.reduce((acc, item) => {
        const priceStr = item.price.replace('₹', '').replace('$', '').replace(',', '');
        return acc + (parseFloat(priceStr) * item.quantity);
    }, 0);

    if (!isCartOpen) return null;

    return (
        <>
            {/* Overlay */}
            <div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0,0,0,0.5)',
                    zIndex: 1040
                }}
                onClick={() => setIsCartOpen(false)}
            />

            {/* Sidebar */}
            <div style={{
                position: 'fixed',
                top: 0,
                right: 0,
                width: '400px',
                maxWidth: '100%',
                height: '100dvh',
                maxHeight: '-webkit-fill-available',
                background: '#ffffff',
                zIndex: 1050,
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '-4px 0 20px rgba(0,0,0,0.15)',
                paddingBottom: 'env(safe-area-inset-bottom, 0)'
            }}>
                {/* Header */}
                <div style={{
                    padding: '20px',
                    borderBottom: '1px solid #d4d5d9',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <h5 style={{ margin: 0, fontWeight: 700, color: '#282c3f' }}>
                        <ShoppingBag size={20} style={{ marginRight: '8px' }} />
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
                        <X size={24} color="#282c3f" />
                    </button>
                </div>

                {/* Cart Items */}
                <div style={{ flex: 1, overflow: 'auto', padding: '16px' }}>
                    {cartItems.length === 0 ? (
                        <div style={{
                            textAlign: 'center',
                            padding: '48px 20px',
                            color: '#94969f'
                        }}>
                            <ShoppingBag size={48} style={{ marginBottom: '16px', opacity: 0.5 }} />
                            <p style={{ fontWeight: 600 }}>Your bag is empty!</p>
                            <p style={{ fontSize: '14px' }}>Add items to start shopping</p>
                        </div>
                    ) : (
                        cartItems.map((item, idx) => (
                            <div key={idx} style={{
                                display: 'flex',
                                gap: '12px',
                                padding: '16px 0',
                                borderBottom: '1px solid #f5f5f6'
                            }}>
                                <div style={{
                                    width: '80px',
                                    height: '100px',
                                    background: '#f5f5f6',
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
                                        color: '#282c3f',
                                        fontSize: '14px'
                                    }}>
                                        {item.name}
                                    </h6>
                                    <p style={{
                                        margin: '0 0 8px',
                                        fontWeight: 700,
                                        color: '#282c3f'
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
                                                background: '#f5f5f6',
                                                border: '1px solid #d4d5d9',
                                                borderRadius: '4px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                cursor: item.quantity <= 1 ? 'not-allowed' : 'pointer',
                                                opacity: item.quantity <= 1 ? 0.5 : 1
                                            }}
                                            disabled={item.quantity <= 1}
                                        >
                                            <Minus size={14} color="#282c3f" />
                                        </button>
                                        <span style={{ fontWeight: 600, minWidth: '20px', textAlign: 'center' }}>{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.id, 1)}
                                            style={{
                                                width: '28px',
                                                height: '28px',
                                                background: '#f5f5f6',
                                                border: '1px solid #d4d5d9',
                                                borderRadius: '4px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                cursor: item.quantity >= 10 ? 'not-allowed' : 'pointer',
                                                opacity: item.quantity >= 10 ? 0.5 : 1
                                            }}
                                            disabled={item.quantity >= 10}
                                        >
                                            <Plus size={14} color="#282c3f" />
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
                            </div>
                        ))
                    )}
                </div>

                {/* Footer */}
                {cartItems.length > 0 && (
                    <div style={{
                        padding: '16px 20px',
                        paddingBottom: 'max(16px, env(safe-area-inset-bottom, 16px))',
                        borderTop: '1px solid #d4d5d9',
                        background: '#ffffff',
                        flexShrink: 0
                    }}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginBottom: '16px'
                        }}>
                            <span style={{ color: '#94969f', fontWeight: 600 }}>Total</span>
                            <span style={{ color: '#282c3f', fontWeight: 700, fontSize: '18px' }}>₹{total}</span>
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
            </div>
        </>
    );
}
