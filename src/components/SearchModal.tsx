"use client";

import { useUI } from '@/context/UIContext';
import { Search, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

import { products } from '@/data/products';


export default function SearchModal() {
    const { isSearchOpen, setIsSearchOpen } = useUI();
    const [query, setQuery] = useState('');

    const filtered = query === '' ? [] : products.filter(item =>
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.brand.toLowerCase().includes(query.toLowerCase())
    );

    const handleClose = () => {
        setIsSearchOpen(false);
        setQuery('');
    };

    // Lock body scroll when modal is open
    useEffect(() => {
        if (isSearchOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [isSearchOpen]);

    if (!isSearchOpen) return null;

    return (
        <AnimatePresence>
            {isSearchOpen && (
                <>
                    {/* Full-screen overlay with flexbox centering */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={handleClose}
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: 'rgba(0, 0, 0, 0.75)',
                            backdropFilter: 'blur(6px)',
                            zIndex: 9998,
                            display: 'flex',
                            alignItems: 'flex-start',
                            justifyContent: 'center',
                            paddingTop: '12vh',
                            paddingLeft: '16px',
                            paddingRight: '16px',
                            boxSizing: 'border-box',
                        }}
                    >
                        {/* Centered search box — click inside doesn't close */}
                        <motion.div
                            initial={{ opacity: 0, y: -30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                            onClick={(e) => e.stopPropagation()}
                            style={{
                                width: '100%',
                                maxWidth: '560px',
                                background: '#111111',
                                borderRadius: '12px',
                                overflow: 'hidden',
                                border: '1px solid rgba(255, 63, 108, 0.25)',
                                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5), 0 0 40px rgba(255, 63, 108, 0.08)',
                                boxSizing: 'border-box',
                            }}
                        >
                            {/* Search input header */}
                            <div style={{
                                padding: '14px 16px',
                                borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                            }}>
                                <Search color="rgba(255,255,255,0.4)" size={20} style={{ flexShrink: 0 }} />
                                <input
                                    autoFocus
                                    type="text"
                                    placeholder="Search for fashion items..."
                                    style={{
                                        flex: 1,
                                        minWidth: 0,
                                        color: '#ffffff',
                                        fontWeight: 500,
                                        fontSize: '15px',
                                        background: 'transparent',
                                        border: 'none',
                                        outline: 'none',
                                    }}
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                />
                                <button
                                    onClick={handleClose}
                                    style={{
                                        background: 'rgba(255,255,255,0.06)',
                                        border: 'none',
                                        padding: '6px',
                                        cursor: 'pointer',
                                        borderRadius: '6px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flexShrink: 0,
                                    }}
                                >
                                    <X color="rgba(255,255,255,0.5)" size={18} />
                                </button>
                            </div>

                            {/* Results area */}
                            <div style={{ maxHeight: '50vh', overflowY: 'auto' }}>
                                <AnimatePresence>
                                    {filtered.length > 0 ? (
                                        filtered.map(item => (
                                            <motion.div
                                                layout
                                                key={item.id}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, scale: 0.95 }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                <Link
                                                    href={`/product/${item.id}`}
                                                    className="d-flex justify-content-between align-items-center text-decoration-none"
                                                    style={{
                                                        padding: '12px 16px',
                                                        borderBottom: '1px solid rgba(255,255,255,0.04)',
                                                        transition: 'background 0.2s',
                                                    }}
                                                    onClick={handleClose}
                                                    onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.04)')}
                                                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                                                >
                                                    <div className="d-flex align-items-center gap-3" style={{ minWidth: 0, flex: 1 }}>
                                                        <img
                                                            src={item.image}
                                                            alt={item.name}
                                                            style={{ width: '44px', height: '44px', objectFit: 'cover', borderRadius: '6px', flexShrink: 0 }}
                                                        />
                                                        <div style={{ minWidth: 0 }}>
                                                            <div style={{ fontSize: '13px', fontWeight: 700, color: '#ffffff' }}>{item.brand}</div>
                                                            <div style={{
                                                                fontSize: '13px',
                                                                color: 'rgba(255,255,255,0.5)',
                                                                whiteSpace: 'nowrap',
                                                                overflow: 'hidden',
                                                                textOverflow: 'ellipsis',
                                                            }}>{item.name}</div>
                                                        </div>
                                                    </div>
                                                    <span style={{ fontWeight: 700, color: '#ff3f6c', fontSize: '14px', flexShrink: 0, marginLeft: '8px' }}>₹{item.price}</span>
                                                </Link>
                                            </motion.div>
                                        ))
                                    ) : query ? (
                                        <div style={{ padding: '40px 20px', textAlign: 'center', color: 'rgba(255,255,255,0.3)' }}>
                                            <Search size={36} style={{ opacity: 0.15, marginBottom: '12px' }} />
                                            <p style={{ margin: 0, fontSize: '14px' }}>No results found for &quot;{query}&quot;</p>
                                        </div>
                                    ) : (
                                        <div style={{ padding: '16px', fontSize: '13px' }}>
                                            <p style={{
                                                fontWeight: 700,
                                                color: '#ff3f6c',
                                                textTransform: 'uppercase',
                                                marginBottom: '12px',
                                                letterSpacing: '0.5px',
                                                fontSize: '11px',
                                            }}>
                                                Trending Product Searches
                                            </p>
                                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                                {["Earrings", "Watches", "Sunglasses", "Wallets"].map(tag => (
                                                    <span
                                                        key={tag}
                                                        onClick={() => setQuery(tag)}
                                                        style={{
                                                            padding: '6px 14px',
                                                            background: 'rgba(255, 63, 108, 0.08)',
                                                            border: '1px solid rgba(255, 63, 108, 0.2)',
                                                            borderRadius: '20px',
                                                            cursor: 'pointer',
                                                            color: 'rgba(255,255,255,0.8)',
                                                            fontSize: '12px',
                                                            transition: 'all 0.2s',
                                                        }}
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
