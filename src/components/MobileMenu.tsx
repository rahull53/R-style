"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, ShoppingBag, Heart, Search, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useUI } from '@/context/UIContext';
import { useAuth } from '@/context/AuthContext';
import styled from 'styled-components';

const MobileMenu = () => {
    const { isMenuOpen, setIsMenuOpen, setIsCartOpen, setIsWishlistOpen, setIsProfileOpen, setIsSearchOpen } = useUI();
    const { user, setIsAuthModalOpen } = useAuth();

    const menuItems = [
        { name: "Men", href: "/category/men" },
        { name: "Women", href: "/category/women" },
        { name: "Accessories", href: "/category/accessories" },
        { name: "Footwear", href: "/category/footwear" },
    ];

    return (
        <AnimatePresence>
            {isMenuOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsMenuOpen(false)}
                        style={{
                            position: 'fixed',
                            inset: 0,
                            background: 'rgba(0, 0, 0, 0.7)',
                            backdropFilter: 'blur(4px)',
                            zIndex: 2000
                        }}
                    />

                    {/* Menu Content */}
                    <motion.div
                        initial={{ x: '-100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '-100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            bottom: 0,
                            width: '80%',
                            maxWidth: '300px',
                            background: '#111111',
                            zIndex: 2001,
                            boxShadow: '10px 0 30px rgba(0,0,0,0.5)',
                            display: 'flex',
                            flexDirection: 'column'
                        }}
                    >
                        <StyledMenuContent>
                            <div className="menu-header">
                                <div className="logo-section">
                                    <div className="logo-wrapper">
                                        <img src="/logo.png" alt="R Style Logo" width={24} height={24} />
                                    </div>
                                </div>
                                <button className="close-btn" onClick={() => setIsMenuOpen(false)}>
                                    <X size={24} color="#ffffff" />
                                </button>
                            </div>

                            <div className="user-section" onClick={() => {
                                setIsMenuOpen(false);
                                user ? setIsProfileOpen(true) : setIsAuthModalOpen(true);
                            }}>
                                <div className="avatar">
                                    {user ? user.name?.charAt(0).toUpperCase() : <User size={20} />}
                                </div>
                                <div className="user-info">
                                    <p className="user-name">{user ? user.name : 'Welcome, Guest'}</p>
                                    <p className="user-subtext">{user ? 'View Profile' : 'Login / Signup'}</p>
                                </div>
                                <ChevronRight size={18} className="arrow" />
                            </div>

                            <div className="nav-links">
                                {menuItems.map((item, idx) => (
                                    <Link
                                        key={idx}
                                        href={item.href}
                                        className="nav-item"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        {item.name}
                                        <ChevronRight size={16} />
                                    </Link>
                                ))}
                            </div>

                            <div className="quick-actions">
                                <div className="action-item" onClick={() => { setIsMenuOpen(false); setIsSearchOpen(true); }}>
                                    <Search size={20} />
                                    <span>Search</span>
                                </div>
                                <div className="action-item" onClick={() => { setIsMenuOpen(false); setIsWishlistOpen(true); }}>
                                    <Heart size={20} />
                                    <span>Wishlist</span>
                                </div>
                                <div className="action-item" onClick={() => { setIsMenuOpen(false); setIsCartOpen(true); }}>
                                    <ShoppingBag size={20} />
                                    <span>Bag</span>
                                </div>
                            </div>

                            <div className="menu-footer">
                                <p>© 2026 R Style Fashion</p>
                            </div>
                        </StyledMenuContent>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

const StyledMenuContent = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    color: white;

    .menu-header {
        padding: 24px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid rgba(255, 63, 108, 0.1);
    }

    .style-text {
        font-weight: 800;
        font-size: 20px;
        color: #ff3f6c;
    }

    .close-btn {
        background: transparent;
        border: none;
        cursor: pointer;
    }

    .user-section {
        padding: 24px;
        background: rgba(255, 63, 108, 0.05);
        display: flex;
        align-items: center;
        gap: 16px;
        cursor: pointer;
        transition: background 0.2s;

        &:active {
            background: rgba(255, 63, 108, 0.1);
        }
    }

    .avatar {
        width: 44px;
        height: 44px;
        background: linear-gradient(135deg, #ff3f6c 0%, #ff905a 100%);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 700;
        font-size: 18px;
    }

    .user-info {
        flex: 1;
        .user-name {
            margin: 0;
            font-weight: 700;
            font-size: 16px;
        }
        .user-subtext {
            margin: 0;
            font-size: 12px;
            color: #94969f;
        }
    }

    .arrow {
        color: #94969f;
    }

    .nav-links {
        padding: 16px 0;
        flex: 1;
        overflow-y: auto;
    }

    .nav-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 16px 24px;
        color: white;
        text-decoration: none;
        font-weight: 600;
        font-size: 15px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        transition: background 0.2s;

        &:active {
            background: rgba(255, 255, 255, 0.05);
            color: #ff3f6c;
        }
    }

    .quick-actions {
        padding: 24px;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 12px;
        border-top: 1px solid rgba(255, 255, 255, 0.05);
    }

    .action-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
        cursor: pointer;

        span {
            font-size: 11px;
            color: #94969f;
        }

        &:active span {
            color: #ff3f6c;
        }
    }

    .menu-footer {
        padding: 20px;
        text-align: center;
        font-size: 11px;
        color: #444;
    }
`;

export default MobileMenu;
