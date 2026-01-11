"use client";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Navigation from '@/components/Navigation';
import GlassCard from '@/components/GlassCard';
import Link from 'next/link';
import { ArrowLeft, ShoppingBag, Heart } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useCart } from '@/context/CartContext';

const CATEGORY_PRODUCTS = [
    { id: 101, brand: "R Style", name: "Premium Leather Jacket", price: "4,999", tag: "Exclusive", image: "/images/leather_jacket.png" },
    { id: 102, brand: "StepUp", name: "Sleek Athletic Shoes", price: "2,599", tag: "New", image: "/images/athletic_shoes.png" },
    { id: 103, brand: "SunStyle", name: "Smart Aviators", price: "1,299", tag: "Hot", image: "/images/sunglasses.png" },
    { id: 104, brand: "Urban Edge", name: "Minimalist Black Tee", price: "899", tag: "Essentials", image: "/images/black_tee.png" },
    { id: 105, brand: "TimeMaster", name: "Classic Gold Watch", price: "3,499", tag: "Lux", image: "/images/watch.png" },
    { id: 106, brand: "ChicBags", name: "Designer Tote", price: "1,599", tag: "Premium", image: "/images/tote.png" },
];

export default function CategoryPage() {
    const params = useParams();
    const { addToCart, addToWishlist, wishlistItems, removeFromWishlist } = useCart();

    // decodeURIComponent to handle spaces or special chars if any
    const categoryName = decodeURIComponent(params.slug as string).toUpperCase();

    return (
        <main className="min-vh-100 pb-5" style={{ background: '#ffffff' }}>
            <Navigation />
            <div className="mb-5"></div>

            <Container className="mt-5 pt-4">
                <Link href="/" className="text-decoration-none text-muted d-inline-flex align-items-center mb-4 hover-pink">
                    <ArrowLeft size={18} className="me-2" /> Back to Home
                </Link>

                <div className="mb-5">
                    <h6 style={{ color: '#ff3f6c', letterSpacing: '2px', fontWeight: 600 }}>CATEGORY</h6>
                    <h1 className="display-4 fw-bold" style={{ color: '#282c3f' }}>{categoryName} COLLECTION</h1>
                </div>

                <Row className="g-4">
                    {CATEGORY_PRODUCTS.map((product) => {
                        const isWishlisted = wishlistItems.some(item => item.id === product.id);

                        return (
                            <Col key={product.id} lg={3} md={4} sm={6} xs={6}>
                                <div className="product-card-myntra h-100">
                                    <div className="product-image" style={{ position: 'relative', paddingTop: '120%' }}>
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            style={{
                                                position: 'absolute',
                                                top: 0,
                                                left: 0,
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover'
                                            }}
                                        />
                                        {product.tag && (
                                            <span className="badge-myntra" style={{ position: 'absolute', top: '10px', left: '10px' }}>
                                                {product.tag}
                                            </span>
                                        )}
                                        <button
                                            onClick={() => isWishlisted ? removeFromWishlist(product.id) : addToWishlist({
                                                id: product.id,
                                                name: product.name,
                                                price: `₹${product.price}`,
                                                image: product.image,
                                                brand: (product as any).brand || 'R Style'
                                            })}
                                            style={{
                                                position: 'absolute',
                                                top: '10px',
                                                right: '10px',
                                                background: 'white',
                                                border: 'none',
                                                borderRadius: '50%',
                                                width: '32px',
                                                height: '32px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                cursor: 'pointer',
                                                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                                                transition: 'all 0.2s ease',
                                                zIndex: 2
                                            }}
                                            suppressHydrationWarning
                                        >
                                            <Heart
                                                size={16}
                                                color={isWishlisted ? "#ff3f6c" : "#282c3f"}
                                                fill={isWishlisted ? "#ff3f6c" : "transparent"}
                                            />
                                        </button>
                                    </div>

                                    <div className="product-info p-3">
                                        <div className="product-brand">{product.brand || 'R Style'}</div>
                                        <div className="product-name" style={{ fontSize: '14px', color: '#535766', marginBottom: '8px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                            {product.name}
                                        </div>
                                        <div className="product-price">
                                            <span className="price-current" style={{ fontWeight: 700, color: '#282c3f' }}>₹{product.price}</span>
                                        </div>

                                        <button
                                            className="btn-myntra w-100 mt-3 d-flex align-items-center justify-content-center gap-2"
                                            style={{ padding: '10px', fontSize: '12px' }}
                                            onClick={() => addToCart({
                                                id: product.id,
                                                name: product.name,
                                                price: `₹${product.price}`,
                                                image: product.image,
                                                brand: (product as any).brand || 'R Style'
                                            })}
                                            suppressHydrationWarning
                                        >
                                            <ShoppingBag size={14} /> ADD TO BAG
                                        </button>
                                    </div>
                                </div>
                            </Col>
                        );
                    })}
                </Row>
            </Container>

            <style jsx>{`
                .hover-pink:hover {
                    color: #ff3f6c !important;
                }
            `}</style>
        </main>
    );
}
