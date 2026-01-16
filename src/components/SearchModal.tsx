"use client";

import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useUI } from '@/context/UIContext';
import { Search, X } from 'lucide-react';
import { useState } from 'react';
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

    return (
        <Modal
            show={isSearchOpen}
            onHide={handleClose}
            centered
            className="modal-myntra"
        >
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                style={{ background: '#ffffff', borderRadius: '4px', overflow: 'hidden' }}
            >
                <div style={{
                    padding: '16px 20px',
                    borderBottom: '1px solid #d4d5d9',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                }}>
                    <Search color="#696b79" size={20} />
                    <Form.Control
                        autoFocus
                        type="text"
                        placeholder="Search for fashion items..."
                        className="border-0 shadow-none fs-5 p-0"
                        style={{ color: '#282c3f', fontWeight: 500 }}
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <button
                        onClick={handleClose}
                        style={{ background: 'none', border: 'none', padding: '4px' }}
                    >
                        <X color="#282c3f" size={20} />
                    </button>
                </div>

                <div style={{ padding: '8px 0', maxHeight: '400px', overflowY: 'auto' }}>
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
                                        className="d-flex justify-content-between align-items-center text-decoration-none p-3 hover-gray"
                                        style={{ borderBottom: '1px solid #f5f5f6' }}
                                        onClick={handleClose}
                                    >
                                        <div className="d-flex align-items-center gap-3">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '4px' }}
                                            />
                                            <div>
                                                <div style={{ fontSize: '12px', fontWeight: 700, color: '#282c3f' }}>{item.brand}</div>
                                                <div style={{ fontSize: '14px', color: '#696b79' }}>{item.name}</div>
                                            </div>
                                        </div>
                                        <span style={{ fontWeight: 700, color: '#ff3f6c' }}>₹{item.price}</span>
                                    </Link>
                                </motion.div>
                            ))
                        ) : query ? (
                            <div style={{ padding: '40px 20px', textAlign: 'center', color: '#94969f' }}>
                                <Search size={40} style={{ opacity: 0.2, marginBottom: '12px' }} />
                                <p>No results found for "{query}"</p>
                            </div>
                        ) : (
                            <div style={{ padding: '20px', color: '#94969f', fontSize: '13px' }}>
                                <p style={{ fontWeight: 700, color: '#282c3f', textTransform: 'uppercase', marginBottom: '12px' }}>
                                    Trending Product Searches
                                </p>
                                <div className="d-flex flex-wrap gap-2">
                                    {["Earrings", "Watches", "Sunglasses", "Wallets"].map(tag => (
                                        <span
                                            key={tag}
                                            onClick={() => setQuery(tag)}
                                            style={{
                                                padding: '6px 16px',
                                                background: '#f5f5f6',
                                                borderRadius: '20px',
                                                cursor: 'pointer',
                                                color: '#282c3f'
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
        </Modal>
    );
}
