"use client";

import { useEffect, useState } from 'react';
import Navigation from '@/components/Navigation';
import { useAuth } from '@/context/AuthContext';
import { getUserOrders, OrderData } from '@/lib/db/orders';
import Container from 'react-bootstrap/Container';
import { Package, Clock, ChevronRight, ShoppingBag } from 'lucide-react';
import Link from 'next/link';

export default function OrdersPage() {
    const { user } = useAuth();
    const [orders, setOrders] = useState<OrderData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchOrders() {
            if (user && (user.mobile || user.email)) {
                // Determine identifier from user object
                const identifier = user.mobile || user.email || '';
                if (identifier) {
                    const result = await getUserOrders(identifier);
                    if (result.success && result.orders) {
                        setOrders(result.orders);
                    }
                }
            }
            setLoading(false);
        }
        fetchOrders();
    }, [user]);

    if (loading) {
        return (
            <main style={{ minHeight: '100vh', background: '#000000', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Navigation />
                <div className="spinner-border text-danger" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </main>
        );
    }

    return (
        <main style={{ minHeight: '100vh', background: '#000000', color: '#ffffff', paddingBottom: '48px' }}>
            <Navigation />
            <div style={{ height: '80px' }}></div>

            <Container className="py-4">
                <h2 className="mb-4 d-flex align-items-center gap-2" style={{ fontWeight: 700 }}>
                    <Package color="#ff3f6c" /> My Orders
                </h2>

                {!user ? (
                    <div className="text-center py-5">
                        <ShoppingBag size={48} color="#666" className="mb-3" />
                        <p style={{ color: '#aaa' }}>Please login to view your orders.</p>
                    </div>
                ) : orders.length === 0 ? (
                    <div className="text-center py-5" style={{ background: '#111', borderRadius: '12px', border: '1px solid #222' }}>
                        <ShoppingBag size={48} color="#666" className="mb-3 mx-auto" style={{ opacity: 0.5 }} />
                        <h4 style={{ fontWeight: 700, color: '#fff' }}>No orders yet</h4>
                        <p style={{ color: '#888', marginBottom: '24px' }}>Looks like you haven't placed any orders yet.</p>
                        <Link href="/" className="btn btn-danger px-4 py-2 fw-bold" style={{ background: '#ff3f6c', border: 'none' }}>
                            Start Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="d-flex flex-column gap-3">
                        {orders.map((order) => (
                            <div key={order.id} style={{ padding: '24px', borderRadius: '12px', background: '#111', border: '1px solid #222' }}>
                                <div className="d-flex justify-content-between align-items-start mb-3 pb-3" style={{ borderBottom: '1px solid #333' }}>
                                    <div>
                                        <div style={{ color: '#888', fontSize: '12px', marginBottom: '4px' }}>ORDER # {order.id?.slice(0, 8).toUpperCase()}</div>
                                        <div style={{ fontWeight: 700, fontSize: '18px', color: '#fff' }}>{order.total}</div>
                                    </div>
                                    <span style={{
                                        padding: '4px 12px',
                                        borderRadius: '20px',
                                        fontSize: '12px',
                                        fontWeight: 700,
                                        background: order.status === 'Delivered' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(245, 158, 11, 0.2)',
                                        color: order.status === 'Delivered' ? '#10b981' : '#f59e0b'
                                    }}>
                                        {order.status}
                                    </span>
                                </div>

                                <div className="mb-3">
                                    {order.items.map((item: any, idx: number) => (
                                        <div key={idx} className="d-flex gap-3 mb-2 align-items-center">
                                            <div style={{ width: '50px', height: '50px', background: '#222', borderRadius: '4px', overflow: 'hidden' }}>
                                                <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                            </div>
                                            <div>
                                                <div style={{ fontWeight: 500, color: '#fff' }}>{item.name}</div>
                                                <div style={{ color: '#888', fontSize: '14px' }}>Qty: {item.quantity} • {item.size || 'Free Size'}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="d-flex justify-content-between align-items-center pt-2" style={{ color: '#888', fontSize: '14px' }}>
                                    <div className="d-flex align-items-center gap-1">
                                        <Clock size={14} />
                                        <span>Ordered {order.createdAt ? new Date(order.createdAt.seconds * 1000).toLocaleDateString() : 'Just now'}</span>
                                    </div>
                                    <button style={{ background: 'none', border: 'none', color: '#ff3f6c', fontWeight: 700, padding: 0, display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        View Details <ChevronRight size={16} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </Container>
        </main>
    );
}
