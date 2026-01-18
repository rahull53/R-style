"use client";

import { X, User, ShoppingBag, Settings, LogOut, Heart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useUI } from '@/context/UIContext';
import Button from 'react-bootstrap/Button';
import { useRouter } from 'next/navigation';

export default function ProfileModal() {
    const { isProfileOpen, setIsProfileOpen, setIsWishlistOpen, setIsCartOpen } = useUI();
    const { user, logout } = useAuth();

    const router = useRouter();

    if (!isProfileOpen) return null;

    const handleLogout = () => {
        logout();
        setIsProfileOpen(false);
    };

    const profileOptions = [
        { icon: <ShoppingBag size={18} />, label: 'Orders', onClick: () => { setIsProfileOpen(false); router.push('/orders'); } },
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
                background: '#111111',
                zIndex: 1050,
                borderRadius: '12px',
                boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
                overflow: 'hidden',
                animation: 'slideIn 0.3s ease',
                border: '1px solid rgba(255, 63, 108, 0.2)'
            }}>
                <style>{`
                    @keyframes slideIn {
                        from { transform: translateY(-10px); opacity: 0; }
                        to { transform: translateY(0); opacity: 1; }
                    }
                    .profile-opt:hover {
                        background: rgba(255, 63, 108, 0.1);
                        color: #ff3f6c !important;
                    }
                    .profile-opt:hover span {
                        color: #ff3f6c !important;
                    }
                `}</style>

                {/* Header */}
                <div style={{
                    padding: '20px',
                    background: '#1a1a1a',
                    borderBottom: '1px solid rgba(255, 63, 108, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                }}>
                    <div style={{
                        width: '40px',
                        height: '40px',
                        background: 'linear-gradient(135deg, #ff3f6c 0%, #333 100%)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white'
                    }}>
                        <User size={24} />
                    </div>
                    <div>
                        <div style={{ fontWeight: 700, fontSize: '14px', color: '#ffffff' }}>
                            {user?.name || 'User'}
                        </div>
                        <div style={{ fontSize: '12px', color: '#aaaaaa' }}>
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
                                color: '#dddddd',
                                fontSize: '14px',
                                fontWeight: 500,
                                transition: 'all 0.2s ease'
                            }}
                        >
                            <span style={{ color: '#888888', transition: 'color 0.2s' }}>{opt.icon}</span>
                            {opt.label}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
