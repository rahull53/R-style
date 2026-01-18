"use client";

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Link from 'next/link';
import Image from 'next/image';
import { Search, ShoppingBag, User, Heart, Menu, X } from 'lucide-react';
import React, { useEffect, useState, memo } from 'react';
import { useCart } from '@/context/CartContext';
import { useUI } from '@/context/UIContext';
import { useAuth } from '@/context/AuthContext';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

// Memoized Badge Sub-components
const WishlistBadge = memo(({ mounted }: { mounted: boolean }) => {
    const { wishlistItems } = useCart();
    if (!mounted || wishlistItems.length === 0) return null;
    return (
        <span className="position-absolute badge-myntra" style={{ top: '-8px', right: '-8px', borderRadius: '50%', padding: '2px 6px', background: '#ff3f6c', color: 'white', fontSize: '10px' }}>
            {wishlistItems.length}
        </span>
    );
});
WishlistBadge.displayName = 'WishlistBadge';

const CartBadge = memo(({ mounted }: { mounted: boolean }) => {
    const { cartItems } = useCart();
    if (!mounted || cartItems.length === 0) return null;
    return (
        <span className="position-absolute badge-myntra" style={{ top: '-8px', right: '-8px', border: '1px solid #ff3f6c', borderRadius: '50%', padding: '2px 6px', background: '#ff3f6c' }}>
            {cartItems.length}
        </span>
    );
});
CartBadge.displayName = 'CartBadge';

export default function Navigation() {
    const [scrolled, setScrolled] = useState(false);
    const [mounted, setMounted] = useState(false);

    const {
        setIsSearchOpen,
        setIsCartOpen,
        setIsWishlistOpen,
        setIsProfileOpen,
        setIsMenuOpen,
        isMenuOpen
    } = useUI();

    const { user, setIsAuthModalOpen } = useAuth();

    useEffect(() => {
        setMounted(true);
        const handleScroll = () => {
            const isScrolled = window.scrollY > 20;
            setScrolled(prev => prev !== isScrolled ? isScrolled : prev);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <StyledNav
            fixed="top"
            className={`py-2 ${scrolled ? 'nav-scrolled' : ''}`}
        >
            <Container fluid className="d-flex align-items-center justify-content-between px-3 h-100">
                {/* Left: Hamburger & Logo */}
                <div className="d-flex align-items-center gap-2">
                    <button
                        className="mobile-toggle d-lg-none"
                        onClick={() => setIsMenuOpen(true)}
                        aria-label="Open Menu"
                    >
                        <Menu size={26} color="#ffffff" strokeWidth={2.5} />
                    </button>

                    <Navbar.Brand as={Link} href="/" className="d-flex align-items-center gap-2 m-0 p-0">
                        <div className="logo-wrapper">
                            <Image src="/logo.png" alt="R Style Logo" width={24} height={24} />
                        </div>
                    </Navbar.Brand>
                    {/* Desktop Links */}
                    <Nav className="ms-5 ps-5 d-none d-lg-flex nav-links-desktop">
                        <Link href="/category/men" className="nav-item">Men</Link>
                        <Link href="/category/women" className="nav-item">Women</Link>
                        <Link href="/category/accessories" className="nav-item">Accessories</Link>
                        <Link href="/category/footwear" className="nav-item">Footwear</Link>
                    </Nav>
                </div>

                {/* Center: Search (Desktop Only) */}
                <div className="flex-grow-1 d-none d-lg-flex justify-content-center mx-5">
                    <div
                        className="search-bar-modern w-100"
                        onClick={() => setIsSearchOpen(true)}
                    >
                        <Search size={18} color="rgba(255,255,255,0.6)" />
                        <span>Search for products, brands and more</span>
                    </div>
                </div>

                {/* Right: Icons */}
                <div className="d-flex align-items-center gap-3 gap-lg-4">
                    {/* Search Icon (Mobile Only) */}
                    <button className="icon-btn d-lg-none" onClick={() => setIsSearchOpen(true)}>
                        <Search size={22} color="#ffffff" />
                    </button>

                    {/* Profile */}
                    <div
                        className="icon-group d-none d-md-flex"
                        onClick={() => user ? setIsProfileOpen(true) : setIsAuthModalOpen(true)}
                    >
                        <User size={22} color="#ffffff" />
                        <span className="icon-label">
                            {user ? (user.name ? user.name.split(' ')[0] : 'Profile') : 'Login'}
                        </span>
                    </div>

                    {/* Wishlist */}
                    <div className="icon-group position-relative" onClick={() => setIsWishlistOpen(true)}>
                        <Heart size={22} color="#ffffff" />
                        <span className="icon-label d-none d-md-block">Wishlist</span>
                        <WishlistBadge mounted={mounted} />
                    </div>

                    {/* Cart */}
                    <div className="icon-group position-relative" onClick={() => setIsCartOpen(true)}>
                        <ShoppingBag size={22} color="#ffffff" />
                        <span className="icon-label d-none d-md-block">Bag</span>
                        <CartBadge mounted={mounted} />
                    </div>

                    {/* Mobile Only Login Icon (if not logged in) */}
                    {!user && (
                        <button className="icon-btn d-md-none" onClick={() => setIsAuthModalOpen(true)}>
                            <User size={22} color="#ffffff" />
                        </button>
                    )}
                    {/* Mobile Only Profile Icon (if logged in) */}
                    {user && (
                        <button className="icon-btn d-md-none" onClick={() => setIsProfileOpen(true)}>
                            <div className="user-avatar-mini">
                                {user.name?.charAt(0).toUpperCase()}
                            </div>
                        </button>
                    )}
                </div>
            </Container>
        </StyledNav>
    );
}

const StyledNav = styled(Navbar)`
    background-color: #000000;
    border-bottom: 1px solid rgba(255, 63, 108, 0.2);
    height: 70px;
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    z-index: 1000;

    &.nav-scrolled {
        height: 60px;
        background-color: rgba(0, 0, 0, 0.85);
        backdrop-filter: blur(10px);
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
    }

    .brand-text {
        font-weight: 800;
        font-size: 20px;
        color: #ff3f6c;
        letter-spacing: -1px;
    }

    .mobile-toggle {
        background: transparent;
        border: none;
        padding: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 8px;
        transition: transform 0.2s;

        &:active {
            transform: scale(0.9);
        }
    }

    .nav-links-desktop {
        .nav-item {
            color: #ffffff;
            text-decoration: none;
            font-size: 13px;
            font-weight: 700;
            text-transform: uppercase;
            padding: 0 16px;
            letter-spacing: 0.5px;
            position: relative;
            transition: color 0.3s;

            &:hover {
                color: #ff3f6c;
            }

            &::after {
                content: '';
                position: absolute;
                bottom: -4px;
                left: 16px;
                right: 16px;
                height: 2px;
                background: #ff3f6c;
                transform: scaleX(0);
                transition: transform 0.3s;
            }

            &:hover::after {
                transform: scaleX(1);
            }
        }
    }

    .search-bar-modern {
        max-width: 450px;
        background: #1a1a1a;
        border-radius: 4px;
        padding: 10px 16px;
        display: flex;
        align-items: center;
        gap: 12px;
        cursor: pointer;
        border: 1px solid transparent;
        transition: all 0.2s;

        span {
            color: rgba(255,255,255,0.5);
            font-size: 14px;
        }

        &:hover {
            background: #252525;
            border-color: rgba(255, 63, 108, 0.4);
        }
    }

    .icon-group {
        display: flex;
        flex-direction: column;
        align-items: center;
        cursor: pointer;
        gap: 2px;
        transition: transform 0.2s;

        &:hover {
            transform: translateY(-2px);
            
            svg {
                color: #ff3f6c !important;
            }
            .icon-label {
                color: #ff3f6c;
            }
        }
    }

    .icon-label {
        font-size: 11px;
        font-weight: 700;
        color: #ffffff;
    }

    .icon-btn {
        background: transparent;
        border: none;
        padding: 4px;
    }

    .user-avatar-mini {
        width: 28px;
        height: 28px;
        background: linear-gradient(135deg, #ff3f6c 0%, #ff905a 100%);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: 700;
        font-size: 12px;
    }
`;
