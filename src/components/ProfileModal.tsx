"use client";

import { X, User, ShoppingBag, Settings, LogOut, Heart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import Button from 'react-bootstrap/Button';

export default function ProfileModal() {
    const { isProfileOpen, setIsProfileOpen, setIsWishlistOpen, setIsCartOpen } = useCart();
    const { user, logout } = useAuth();

    if (!isProfileOpen) return null;

    const handleLogout = () => {
        logout();
        setIsProfileOpen(false);
    };

    const profileOptions = [
        { icon: <ShoppingBag size={18} />, label: 'Orders', onClick: () => { setIsProfileOpen(false); } },
        { icon: <Heart size={18} />, label: 'Wishlist', onClick: () => { setIsWishlistOpen(true); setIsProfileOpen(false); } },
        { icon: <Settings size={18} />, label: 'Settings', onClick: () => { setIsProfileOpen(false); } },
        { icon: <LogOut size={18} />, label: 'Logout', onClick: handleLogout },
    ];

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
                onClick={() => setIsProfileOpen(false)}
            />

            {/* Modal */}
            <div style={{
                position: 'fixed',
                top: '80px',
                right: '16px',
                left: '16px',
                maxWidth: '300px',
                marginLeft: 'auto',
                background: '#ffffff',
                zIndex: 1050,
                borderRadius: '8px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                overflow: 'hidden',
                animation: 'slideIn 0.3s ease'
            }}>
                <style>{`
                    @keyframes slideIn {
                        from { transform: translateY(-10px); opacity: 0; }
                        to { transform: translateY(0); opacity: 1; }
                    }
                    .profile-opt:hover {
                        background: #f5f5f6;
                    }
                `}</style>

                {/* Header */}
                <div style={{
                    padding: '20px',
                    background: '#f5f5f6',
                    borderBottom: '1px solid #d4d5d9',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                }}>
                    <div style={{
                        width: '40px',
                        height: '40px',
                        background: '#3e4152',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white'
                    }}>
                        <User size={24} />
                    </div>
                    <div>
                        <div style={{ fontWeight: 700, fontSize: '14px', color: '#282c3f' }}>
                            {user?.name || 'User'}
                        </div>
                        <div style={{ fontSize: '12px', color: '#696b79' }}>
                            {user?.mobile ? `+91 ${user.mobile}` : 'Access account'}
                        </div>
                    </div>
                </div>

                <div style={{ padding: '8px 0' }}>

                    {profileOptions.map((opt, idx) => (
                        <div
                            key={idx}
                            className="profile-opt"
                            onClick={opt.onClick}
                            style={{
                                padding: '12px 20px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                cursor: 'pointer',
                                color: '#3e4152',
                                fontSize: '14px',
                                fontWeight: 500
                            }}
                        >
                            <span style={{ color: '#696b79' }}>{opt.icon}</span>
                            {opt.label}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
