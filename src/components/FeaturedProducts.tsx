"use client";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { motion } from 'framer-motion';

import { products } from '@/data/products';
import ProductCard from './ProductCard';


export default function FeaturedProducts() {
    const { addToCart, addToWishlist, wishlistItems, removeFromWishlist } = useCart();

    return (
        <div style={{ backgroundColor: '#000000', color: '#ffffff' }}>
            <Container className="py-4">
                <div className="section-header">
                    <motion.h2
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        style={{ color: '#ffffff' }}
                    >
                        Trending Now
                    </motion.h2>
                    <Link href="/category/all" style={{ color: '#ff3f6c' }}>View All</Link>
                </div>

                <Row className="g-3">
                    {products.map((product) => {
                        const isWishlisted = wishlistItems.some(item => item.id === product.id);

                        return (
                            <Col key={product.id} xl={3} lg={4} md={6} sm={12} className="mb-4">
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
                </Row>
            </Container>
        </div>
    );
}
