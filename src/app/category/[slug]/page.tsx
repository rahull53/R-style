"use client";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Navigation from '@/components/Navigation';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { products } from '@/data/products';
import Footer from '@/components/Footer';

export default function CategoryPage() {
    const params = useParams();
    const { addToCart, addToWishlist, wishlistItems, removeFromWishlist } = useCart();

    const slug = params.slug as string;
    const categoryName = decodeURIComponent(slug).toUpperCase();

    // Map slug to category field in data (simple case-insensitive match for now)
    const filteredProducts = products.filter(p => {
        if (!p.category) return false;
        if (slug === 'all') return true;

        // Handle specific mappings
        if (slug === 'men' || slug === 'women') {
            return p.category.toLowerCase() === 'clothing' || p.category.toLowerCase() === slug;
        }

        return p.category.toLowerCase() === slug.toLowerCase();
    });

    return (
        <main className="min-vh-100 pb-5" style={{ background: '#000000', color: '#ffffff' }}>
            <Navigation />
            <div className="mb-5"></div>

            <Container className="mt-5 pt-4">
                <Link href="/" className="text-decoration-none d-inline-flex align-items-center mb-4 hover-pink" style={{ color: '#ffffff', opacity: 0.7 }}>
                    <ArrowLeft size={18} className="me-2" /> Back to Home
                </Link>

                <div className="mb-5 text-center">
                    <h6 style={{ color: '#ff3f6c', letterSpacing: '2px', fontWeight: 600 }}>COLLECTION</h6>
                    <h1 className="display-4 fw-bold" style={{ color: '#ffffff' }}>{categoryName}</h1>
                    <div style={{ width: '60px', height: '4px', background: '#ff3f6c', margin: '20px auto' }}></div>
                </div>

                <Row className="g-4">
                    {filteredProducts.map((product) => {
                        const isWishlisted = wishlistItems.some(item => item.id === product.id);

                        return (
                            <Col key={product.id} lg={3} md={4} sm={6} xs={12}>
                                <ProductCard
                                    id={product.id}
                                    name={product.name}
                                    brand={product.brand}
                                    price={product.price}
                                    image={product.image}
                                    tag={product.tag}
                                    isWishlisted={isWishlisted}
                                    onAddToCart={() => addToCart({
                                        id: product.id,
                                        name: product.name,
                                        price: `₹${product.price}`,
                                        image: product.image,
                                        brand: product.brand
                                    })}
                                    onToggleWishlist={() =>
                                        isWishlisted
                                            ? removeFromWishlist(product.id)
                                            : addToWishlist({
                                                id: product.id,
                                                name: product.name,
                                                price: `₹${product.price}`,
                                                image: product.image,
                                                brand: product.brand
                                            })
                                    }
                                />
                            </Col>
                        );
                    })}
                    {filteredProducts.length === 0 && (
                        <Col xs={12} className="text-center py-5">
                            <h3 style={{ color: '#ffffff', opacity: 0.5 }}>No products found in this category.</h3>
                        </Col>
                    )}
                </Row>
            </Container>

            <Footer />

            <style jsx>{`
                .hover-pink:hover {
                    color: #ff3f6c !important;
                    opacity: 1 !important;
                }
            `}</style>
        </main>
    );
}
