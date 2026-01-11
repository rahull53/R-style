"use client";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Link from 'next/link';
import { ShoppingBag, Heart } from 'lucide-react';
import { useCart } from '@/context/CartContext';

import { products } from '@/data/products';


export default function FeaturedProducts() {
    const { addToCart, addToWishlist, wishlistItems, removeFromWishlist } = useCart();

    return (
        <Container className="py-4">
            <div className="section-header">
                <h2>Trending Now</h2>
                <Link href="/category/all">View All</Link>
            </div>

            <Row className="g-3">
                {products.map((product) => {
                    const isWishlisted = wishlistItems.some(item => item.id === product.id);

                    return (
                        <Col key={product.id} xl={3} lg={3} md={4} sm={6} xs={6}>
                            <div className="product-card-myntra">
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
                                            brand: product.brand
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
                                            transition: 'all 0.2s ease'
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

                                <div className="product-info">
                                    <div className="product-brand">{product.brand}</div>
                                    <div className="product-name">{product.name}</div>
                                    <div className="product-price">
                                        <span className="price-current">₹{product.price}</span>
                                        <span className="price-original">₹{product.originalPrice}</span>
                                        <span className="price-discount">{product.discount}</span>
                                    </div>

                                    <button
                                        className="btn-myntra w-100 mt-3 d-flex align-items-center justify-content-center gap-2"
                                        style={{ padding: '10px', fontSize: '12px' }}
                                        onClick={() => addToCart({
                                            id: product.id,
                                            name: product.name,
                                            price: `₹${product.price}`,
                                            image: product.image,
                                            brand: product.brand
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
    );
}
