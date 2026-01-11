"use client";

import { X, Trash2, Heart, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import Button from 'react-bootstrap/Button';

export default function WishlistModal() {
    const { wishlistItems, removeFromWishlist, addToCart, isWishlistOpen, setIsWishlistOpen } = useCart();

    if (!isWishlistOpen) return null;

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
                    background: 'rgba(0, 0, 0, 0.5)',
                    zIndex: 1040
                }}
                onClick={() => setIsWishlistOpen(false)}
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
                        <Heart size={20} style={{ marginRight: '8px', fill: '#ff3f6c', color: '#ff3f6c' }} />
                        Wishlist ({wishlistItems.length})
                    </h5>
                    <button
                        onClick={() => setIsWishlistOpen(false)}
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

                {/* Wishlist Items */}
                <div style={{ flex: 1, overflow: 'auto', padding: '16px' }}>
                    {wishlistItems.length === 0 ? (
                        <div style={{
                            textAlign: 'center',
                            padding: '48px 20px',
                            color: '#94969f'
                        }}>
                            <Heart size={48} style={{ marginBottom: '16px', opacity: 0.5 }} />
                            <p style={{ fontWeight: 600 }}>Your wishlist is empty!</p>
                            <p style={{ fontSize: '14px' }}>Save items you love here</p>
                        </div>
                    ) : (
                        wishlistItems.map((item, idx) => (
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
                                    <div style={{ display: 'flex', gap: '12px' }}>
                                        <button
                                            onClick={() => {
                                                addToCart(item);
                                                removeFromWishlist(item.id);
                                            }}
                                            style={{
                                                background: 'none',
                                                border: 'none',
                                                color: '#ff3f6c',
                                                fontSize: '12px',
                                                fontWeight: 700,
                                                cursor: 'pointer',
                                                padding: 0,
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '4px'
                                            }}
                                        >
                                            <ShoppingBag size={14} /> MOVE TO BAG
                                        </button>
                                        <button
                                            onClick={() => removeFromWishlist(item.id)}
                                            style={{
                                                background: 'none',
                                                border: 'none',
                                                color: '#94969f',
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
                            </div>
                        ))
                    )}
                </div>
            </div>
        </>
    );
}
