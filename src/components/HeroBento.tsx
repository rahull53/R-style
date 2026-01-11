"use client";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Link from 'next/link';
import Image from 'next/image';

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
            <div className="promo-banner">
                🎉 FLAT 50% OFF on Your First Order! Use Code: <strong>RSTYLE50</strong> 🎉
            </div>

            {/* Hero Banner */}
            <div className="hero-banner" style={{ marginTop: '70px' }}>
                <div className="hero-container" style={{
                    position: 'relative',
                    width: '100%',
                    background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
                    overflow: 'hidden'
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
                        <h1 className="hero-title">
                            FASHION SALE
                        </h1>
                        <p className="hero-subtitle">
                            Up to 50-80% Off on Trendy Styles
                        </p>
                        <Link href="/category/women" className="btn-myntra" style={{ textDecoration: 'none' }}>
                            SHOP NOW
                        </Link>
                    </div>
                </div>
            </div>

            {/* Category Cards */}
            <Container className="py-5">
                <div className="section-header">
                    <h2>Shop by Category</h2>
                    <Link href="/category/all">View All</Link>
                </div>

                <Row className="g-4">
                    {CATEGORIES.map((category, idx) => (
                        <Col key={idx} xl={3} lg={3} md={6} xs={6}>
                            <Link href={category.href} style={{ textDecoration: 'none' }}>
                                <div className="category-card">
                                    <Image
                                        src={category.image}
                                        alt={category.name}
                                        fill
                                        style={{ objectFit: 'cover' }}
                                    />
                                    <div className="category-overlay">
                                        <h3>{category.name}</h3>
                                        <p>{category.tagline}</p>
                                    </div>
                                </div>
                            </Link>
                        </Col>
                    ))}
                </Row>
            </Container>

            {/* Deals Banner */}
            <Container className="pb-5">
                <Row className="g-4">
                    <Col md={6}>
                        <div className="deal-card deal-fest">
                            <span className="deal-tag">LIMITED TIME</span>
                            <h3 className="deal-title">Accessories Fest</h3>
                            <p className="deal-desc">Min 40% Off on Watches, Bags & More</p>
                        </div>
                    </Col>
                    <Col md={6}>
                        <div className="deal-card deal-new">
                            <span className="deal-tag">NEW ARRIVALS</span>
                            <h3 className="deal-title">Footwear Collection</h3>
                            <p className="deal-desc">Sneakers, Heels & Sandals</p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
}
