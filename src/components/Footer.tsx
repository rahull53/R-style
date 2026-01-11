"use client";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Link from 'next/link';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="footer-myntra pt-5">
            <Container>
                <Row className="g-4">
                    <Col lg={3} md={6} xs={6}>
                        <h6 className="footer-heading">Online Shopping</h6>
                        <Link href="/category/men" className="footer-link">Men</Link>
                        <Link href="/category/women" className="footer-link">Women</Link>
                        <Link href="/category/accessories" className="footer-link">Accessories</Link>
                        <Link href="/category/footwear" className="footer-link">Footwear</Link>
                    </Col>

                    <Col lg={3} md={6} xs={6}>
                        <h6 className="footer-heading">Customer Policies</h6>
                        <Link href="#" className="footer-link">Contact Us</Link>
                        <Link href="#" className="footer-link">FAQ</Link>
                        <Link href="#" className="footer-link">Terms of Use</Link>
                        <Link href="#" className="footer-link">Privacy Policy</Link>
                    </Col>

                    <Col lg={3} md={6} xs={6}>
                        <h6 className="footer-heading">Useful Links</h6>
                        <Link href="/admin" className="footer-link">Admin Dashboard</Link>
                        <Link href="#" className="footer-link">Track Order</Link>
                        <Link href="#" className="footer-link">Size Guide</Link>
                        <Link href="#" className="footer-link">Returns</Link>
                    </Col>

                    <Col lg={3} md={6} xs={6}>
                        <h6 className="footer-heading">Keep in Touch</h6>
                        <div style={{ display: 'flex', gap: '16px', marginTop: '8px' }}>
                            <a href="#" className="social-icon"><Facebook size={20} /></a>
                            <a href="#" className="social-icon"><Instagram size={20} /></a>
                            <a href="#" className="social-icon"><Twitter size={20} /></a>
                            <a href="#" className="social-icon"><Youtube size={20} /></a>
                        </div>
                        <p style={{ fontSize: '13px', color: '#94969f', marginTop: '16px' }}>
                            Get exclusive offers and updates directly on WhatsApp!
                        </p>
                    </Col>
                </Row>

                <div className="footer-bottom">
                    © 2025 R Style. All rights reserved.
                </div>
            </Container>
        </footer>
    );
}
