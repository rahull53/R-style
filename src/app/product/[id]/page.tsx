
"use client";

import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Navigation from '@/components/Navigation';
import { ArrowLeft, Star, ShoppingBag, Heart, Truck } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { products } from '@/data/products';

export default function ProductPage() {
    const params = useParams();
    const productId = params.id as string;
    const { addToCart, addToWishlist, wishlistItems, removeFromWishlist } = useCart();
    const [selectedSize, setSelectedSize] = useState<string | null>(null);

    // Find product by ID
    const product = products.find(p => p.id === Number(productId));
    const isWishlisted = wishlistItems.some(item => item.id === product?.id);

    // Handle product not found
    if (!product) {
        return (
            <main className="min-vh-100 d-flex flex-column align-items-center justify-content-center" style={{ background: '#fff' }}>
                <Navigation />
                <h2 className="text-dark mt-5">Product not found</h2>
                <Link href="/" className="btn btn-danger mt-3 rounded-0">Back to Home</Link>
            </main>
        );
    }

    const hasVariantSizes = product.sizes && product.sizes.length > 0;

    return (
        <main className="min-vh-100" style={{ background: '#ffffff' }}>
            <Navigation />
            <div style={{ height: '80px' }}></div> {/* Spacer for fixed navbar */}

            <Container className="py-4">
                {/* Breadcrumb */}
                <Link href="/" className="text-decoration-none d-inline-flex align-items-center mb-3" style={{ color: '#94969f', fontSize: '14px' }}>
                    <ArrowLeft size={16} className="me-2" /> Back to Collection
                </Link>

                <Row className="g-4">
                    {/* Product Image Side */}
                    <Col lg={6}>
                        <div style={{
                            background: '#f5f5f6',
                            aspectRatio: '3/4',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            overflow: 'hidden'
                        }}>
                            <img
                                src={product.image}
                                alt={product.name}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        </div>
                    </Col>

                    {/* Product Details Side */}
                    <Col lg={6}>
                        <div className="ps-lg-4">
                            {/* Brand */}
                            <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#282c3f', marginBottom: '4px' }}>
                                {product.brand}
                            </h2>

                            {/* Product Name */}
                            <p style={{ fontSize: '20px', color: '#535766', marginBottom: '12px' }}>
                                {product.name}
                            </p>

                            {/* Rating */}
                            <div className="d-flex align-items-center gap-2 mb-3 pb-3" style={{ borderBottom: '1px solid #d4d5d9' }}>
                                <span className="d-inline-flex align-items-center px-2 py-1" style={{ background: '#14958f', color: 'white', fontSize: '14px', fontWeight: 600, borderRadius: '2px' }}>
                                    {product.rating || 4.5} <Star size={12} fill="white" className="ms-1" />
                                </span>
                                <span style={{ color: '#878b94', fontSize: '14px' }}>| 2.1k Ratings</span>
                            </div>

                            {/* Price Section */}
                            <div className="mb-2">
                                <span style={{ fontSize: '24px', fontWeight: 700, color: '#282c3f' }}>₹{product.price}</span>
                                <span style={{ fontSize: '20px', color: '#94969f', textDecoration: 'line-through', marginLeft: '12px' }}>MRP ₹{product.originalPrice}</span>
                                <span style={{ fontSize: '20px', color: '#ff905a', fontWeight: 700, marginLeft: '12px' }}>({product.discount})</span>
                            </div>
                            <p style={{ color: '#03a685', fontSize: '14px', fontWeight: 700, marginBottom: '20px' }}>inclusive of all taxes</p>

                            {/* Size Selection - Only for Clothing/Footwear */}
                            {(product.category === 'Clothing' || product.category === 'Footwear') && (
                                <div className="mb-4">
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <span style={{ fontSize: '16px', fontWeight: 700, color: '#282c3f' }}>SELECT SIZE</span>
                                        <span style={{ fontSize: '14px', fontWeight: 700, color: '#ff3f6c', cursor: 'pointer' }}>SIZE CHART &gt;</span>
                                    </div>
                                    <div className="d-flex flex-wrap gap-2">
                                        {hasVariantSizes ? (
                                            product.sizes!.map((sizeInfo) => (
                                                <div key={sizeInfo.size} className="text-center">
                                                    <Button
                                                        variant={selectedSize === sizeInfo.size ? 'danger' : 'outline-secondary'}
                                                        onClick={() => sizeInfo.stock > 0 && setSelectedSize(sizeInfo.size)}
                                                        disabled={sizeInfo.stock === 0}
                                                        style={{
                                                            width: '50px',
                                                            height: '50px',
                                                            borderRadius: '50%',
                                                            fontWeight: 700,
                                                            fontSize: '14px',
                                                            opacity: sizeInfo.stock === 0 ? 0.4 : 1,
                                                            textDecoration: sizeInfo.stock === 0 ? 'line-through' : 'none'
                                                        }}
                                                        suppressHydrationWarning
                                                    >
                                                        {sizeInfo.size}
                                                    </Button>
                                                    {sizeInfo.stock > 0 && sizeInfo.stock <= 3 && (
                                                        <div style={{ fontSize: '10px', color: '#ff3f6c', marginTop: '4px' }}>{sizeInfo.stock} left</div>
                                                    )}
                                                </div>
                                            ))
                                        ) : (
                                            ['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                                                <Button
                                                    key={size}
                                                    variant={selectedSize === size ? 'danger' : 'outline-secondary'}
                                                    onClick={() => setSelectedSize(size)}
                                                    style={{
                                                        width: '50px',
                                                        height: '50px',
                                                        borderRadius: '50%',
                                                        fontWeight: 700,
                                                        fontSize: '14px'
                                                    }}
                                                    suppressHydrationWarning
                                                >
                                                    {size}
                                                </Button>
                                            ))
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="d-flex gap-3 mb-4">
                                <Button
                                    style={{
                                        background: '#ff3f6c',
                                        border: 'none',
                                        borderRadius: '0',
                                        padding: '16px 40px',
                                        fontWeight: 700,
                                        fontSize: '14px',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.5px',
                                        flex: 1
                                    }}
                                    onClick={() => addToCart({
                                        id: Number(productId),
                                        name: product.name,
                                        price: `₹${product.price}`,
                                        image: product.image,
                                        size: selectedSize || undefined
                                    })}
                                    suppressHydrationWarning
                                >
                                    <ShoppingBag size={18} className="me-2" /> ADD TO BAG
                                </Button>
                                <Button
                                    variant="outline-dark"
                                    style={{
                                        borderRadius: '0',
                                        padding: '16px 40px',
                                        fontWeight: 700,
                                        fontSize: '14px',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.5px',
                                        flex: 1
                                    }}
                                    onClick={() => {
                                        if (isWishlisted) {
                                            removeFromWishlist(product.id);
                                        } else {
                                            addToWishlist({
                                                id: product.id,
                                                name: product.name,
                                                price: `₹${product.price}`,
                                                image: product.image,
                                                brand: product.brand
                                            });
                                        }
                                    }}
                                >
                                    <Heart
                                        size={18}
                                        className="me-2"
                                        fill={isWishlisted ? '#ff3f6c' : 'none'}
                                        color={isWishlisted ? '#ff3f6c' : 'currentColor'}
                                    />
                                    WISHLIST
                                </Button>
                            </div>


                            {/* Product Description */}
                            <div style={{ borderTop: '1px solid #d4d5d9', paddingTop: '20px', marginTop: '20px' }}>
                                <h6 style={{ fontWeight: 700, color: '#282c3f', fontSize: '14px', textTransform: 'uppercase', marginBottom: '12px' }}>Product Details</h6>
                                <p style={{ color: '#535766', fontSize: '14px', lineHeight: 1.7 }}>
                                    {product.description || 'Experience premium quality with this exclusive item.'}
                                </p>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </main>
    );
}
