"use client";

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Link from 'next/link';
import Image from 'next/image';
import { Search, ShoppingBag, User, Heart, Menu } from 'lucide-react';
import React, { useEffect, useState, memo } from 'react';
import { useCart } from '@/context/CartContext';
import { useUI } from '@/context/UIContext';
import { useAuth } from '@/context/AuthContext';

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
        <span className="position-absolute badge-myntra" style={{ top: '-8px', right: '-8px', borderRadius: '50%', padding: '2px 6px' }}>
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
    } = useUI();

    const { user, setIsAuthModalOpen } = useAuth();

    useEffect(() => {
        setMounted(true);
        const handleScroll = () => {
            const isScrolled = window.scrollY > 50;
            setScrolled(prev => prev !== isScrolled ? isScrolled : prev);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <Navbar
            expand="lg"
            fixed="top"
            className={`py-2 navbar-myntra ${scrolled ? 'shadow-sm' : ''}`}
            style={{ backgroundColor: '#000000', borderBottom: '1px solid rgba(255, 63, 108, 0.3)' }}
        >
            <Container fluid className="d-flex align-items-center justify-content-between px-3">
                <div className="d-flex align-items-center gap-2">
                    <Navbar.Toggle aria-controls="navbar-nav" className="border-0 p-0 me-2" suppressHydrationWarning>
                        <Menu size={24} color="#ffffff" />
                    </Navbar.Toggle>

                    <Navbar.Brand as={Link} href="/" className="d-flex align-items-center gap-2 m-0">
                        <Image src="/logo.png" alt="R Style Logo" width={32} height={32} />
                        <span style={{
                            fontWeight: 800,
                            fontSize: '18px',
                            color: '#ff3f6c',
                            letterSpacing: '-0.5px'
                        }}>
                            Style
                        </span>
                    </Navbar.Brand>
                </div>

                {/* Mobile Icons - Right Side */}
                <div className="d-flex d-lg-none align-items-center gap-3">
                    <div onClick={() => setIsWishlistOpen(true)} className="position-relative">
                        <Heart size={22} color="#ffffff" />
                        <WishlistBadge mounted={mounted} />
                    </div>
                    <div onClick={() => setIsCartOpen(true)} className="position-relative">
                        <ShoppingBag size={22} color="#ffffff" />
                        <CartBadge mounted={mounted} />
                    </div>
                </div>

                <Navbar.Collapse id="navbar-nav">
                    {/* PC Navigation Links */}
                    <Nav className="me-auto ms-4 d-none d-lg-flex">
                        <Nav.Link as={Link} href="/category/men" className="nav-link-myntra">Men</Nav.Link>
                        <Nav.Link as={Link} href="/category/women" className="nav-link-myntra">Women</Nav.Link>
                        <Nav.Link as={Link} href="/category/accessories" className="nav-link-myntra">Accessories</Nav.Link>
                        <Nav.Link as={Link} href="/category/footwear" className="nav-link-myntra">Footwear</Nav.Link>
                    </Nav>

                    {/* PC Search Bar */}
                    <div className="flex-grow-1 d-none d-lg-flex justify-content-center mx-5">
                        <div
                            className="search-myntra w-100"
                            onClick={() => setIsSearchOpen(true)}
                            style={{ cursor: 'pointer', maxWidth: '500px' }}
                        >
                            <Search size={18} color="#696b79" />
                            <input
                                type="text"
                                placeholder="Search for products, brands and more"
                                readOnly
                                style={{ cursor: 'pointer' }}
                                suppressHydrationWarning
                            />
                        </div>
                    </div>

                    {/* PC Right Icons */}
                    <div className="d-none d-lg-flex gap-4 align-items-center justify-content-center">
                        <div
                            className="text-center"
                            style={{ cursor: 'pointer' }}
                            onClick={() => user ? setIsProfileOpen(true) : setIsAuthModalOpen(true)}
                        >
                            <User size={20} color="#ffffff" />
                            <div style={{ fontSize: '11px', fontWeight: 600, color: '#ffffff' }}>
                                {user ? (user.name ? user.name.split(' ')[0] : 'Profile') : 'Login'}
                            </div>
                        </div>
                        <div className="text-center position-relative" style={{ cursor: 'pointer' }} onClick={() => setIsWishlistOpen(true)}>
                            <Heart size={20} color="#ffffff" />
                            <div style={{ fontSize: '11px', fontWeight: 600, color: '#ffffff' }}>Wishlist</div>
                            <WishlistBadge mounted={mounted} />
                        </div>
                        <div className="text-center position-relative" style={{ cursor: 'pointer' }} onClick={() => setIsCartOpen(true)}>
                            <ShoppingBag size={20} color="#ffffff" />
                            <div style={{ fontSize: '11px', fontWeight: 600, color: '#ffffff' }}>Bag</div>
                            <CartBadge mounted={mounted} />
                        </div>
                    </div>

                    {/* Mobile Search Bar (Inside Hamburger Menu) */}
                    <div className="d-lg-none mt-3 mb-2">
                        <div
                            className="search-myntra w-100"
                            onClick={() => setIsSearchOpen(true)}
                            style={{
                                cursor: 'pointer',
                                height: '40px',
                                background: '#f5f5f6',
                                border: '1px solid #f5f5f6'
                            }}
                        >
                            <Search size={18} color="#696b79" />
                            <input
                                type="text"
                                placeholder="Search for products..."
                                readOnly
                                style={{ cursor: 'pointer', background: 'transparent' }}
                                suppressHydrationWarning
                            />
                        </div>
                    </div>

                    {/* Mobile Menu Links (Inside Hamburger) */}
                    <Nav className="d-lg-none mt-3">
                        <Nav.Link as={Link} href="/" className="fw-bold text-white border-bottom border-secondary py-3">Home</Nav.Link>
                        <Nav.Link as={Link} href="/category/men" className="fw-bold text-white border-bottom border-secondary py-3">Men</Nav.Link>
                        <Nav.Link as={Link} href="/category/women" className="fw-bold text-white border-bottom border-secondary py-3">Women</Nav.Link>
                        <Nav.Link as={Link} href="/category/accessories" className="fw-bold text-white border-bottom border-secondary py-3">Accessories</Nav.Link>
                        <Nav.Link as={Link} href="/category/footwear" className="fw-bold text-white border-bottom border-secondary py-3">Footwear</Nav.Link>
                        <div className="py-3" onClick={() => user ? setIsProfileOpen(true) : setIsAuthModalOpen(true)}>
                            <span className="fw-bold text-white">{user ? 'Profile' : 'Login / Signup'}</span>
                        </div>
                    </Nav>
                </Navbar.Collapse>
            </Container>

        </Navbar>
    );
}
