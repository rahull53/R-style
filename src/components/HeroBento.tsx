"use client";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import AnimatedButton from './ui/animated-button';
import { useRouter } from 'next/navigation';

const CATEGORIES = [
    {
        name: "Men",
        tagline: "Explore Now",
        image: "/images/category_men.png",
        href: "/category/men"
    },
    {
        name: "Women",
        tagline: "New Arrivals",
        image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80",
        href: "/category/women"
    },
    {
        name: "Accessories",
        tagline: "Trending",
        image: "/images/watch.png",
        href: "/category/accessories"
    },
    {
        name: "Footwear",
        tagline: "Best Sellers",
        image: "/images/athletic_shoes.png",
        href: "/category/footwear"
    }
];

export default function HeroBento() {
    return (
        <>
            {/* Promo Banner */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="promo-banner"
            >
                🎉 FLAT 50% OFF on Your First Order! Use Code: <strong>RSTYLE50</strong> 🎉
            </motion.div>

            {/* Hero Banner */}
            <div className="hero-banner" style={{ backgroundColor: '#000000', paddingTop: '70px' }}>
                <div className="hero-container" style={{
                    position: 'relative',
                    width: '100%',
                    background: 'linear-gradient(135deg, #000000 0%, #ff3f6c 100%)',
                    overflow: 'hidden',
                    borderBottom: '1px solid rgba(255, 63, 108, 0.3)'
                }}>
                    <div className="hero-content" style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        textAlign: 'center',
                        zIndex: 1,
                        width: '90%'
                    }}>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="hero-title"
                            style={{ color: '#ffffff', textShadow: '0 0 10px rgba(255, 63, 108, 0.5)' }}
                        >
                            FASHION SALE
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="hero-subtitle"
                            style={{ color: '#ffffff', opacity: 0.9 }}
                        >
                            Up to 50-80% Off on Trendy Styles
                        </motion.p>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                        >
                            <Link href="/category/women" style={{ textDecoration: 'none' }}>
                                <AnimatedButton>SHOP NOW</AnimatedButton>
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Category Cards */}
            <div style={{ backgroundColor: '#000000', color: '#ffffff' }}>
                <Container className="py-5">
                    <div className="section-header">
                        <motion.h2
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            style={{ color: '#ffffff' }}
                        >
                            Shop by Category
                        </motion.h2>
                        <Link href="/category/all" style={{ color: '#ff3f6c' }}>View All</Link>
                    </div>

                    <Row className="g-4">
                        {CATEGORIES.map((category, idx) => (
                            <Col key={idx} xl={3} lg={3} md={6} xs={6}>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                                    whileHover={{ y: -5 }}
                                >
                                    <Link href={category.href} style={{ textDecoration: 'none' }}>
                                        <div className="category-card" style={{ border: '1px solid rgba(255, 63, 108, 0.2)' }}>
                                            <Image
                                                src={category.image}
                                                alt={category.name}
                                                fill
                                                sizes="(max-width: 640px) 50vw, 300px"
                                                quality={65}
                                                style={{ objectFit: 'cover' }}
                                            />
                                            <div className="category-overlay">
                                                <h3 style={{ color: '#ffffff' }}>{category.name}</h3>
                                                <p style={{ color: '#d3d3d3' }}>{category.tagline}</p>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </div>

            {/* Deals Banner */}
            <div style={{ backgroundColor: '#000000', color: '#ffffff' }}>
                <Container className="pb-5">
                    <Row className="g-4">
                        <Col md={6}>
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className="deal-card deal-fest"
                                style={{ background: 'linear-gradient(45deg, #111, #ff3f6c33)', border: '1px solid rgba(255, 63, 108, 0.3)' }}
                            >
                                <span className="deal-tag" style={{ background: '#ff3f6c' }}>LIMITED TIME</span>
                                <h3 className="deal-title" style={{ color: '#ffffff' }}>Accessories Fest</h3>
                                <p className="deal-desc" style={{ color: '#d3d3d3' }}>Min 40% Off on Watches, Bags & More</p>
                            </motion.div>
                        </Col>
                        <Col md={6}>
                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className="deal-card deal-new"
                                style={{ background: 'linear-gradient(45deg, #111, #333)', border: '1px solid rgba(255, 255, 255, 0.1)' }}
                            >
                                <span className="deal-tag" style={{ background: '#444' }}>NEW ARRIVALS</span>
                                <h3 className="deal-title" style={{ color: '#ffffff' }}>Footwear Collection</h3>
                                <p className="deal-desc" style={{ color: '#d3d3d3' }}>Sneakers, Heels & Sandals</p>
                            </motion.div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
}
