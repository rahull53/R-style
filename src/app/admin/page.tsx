"use client";

import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { Package, Trash2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function AdminPage() {
    const [orders, setOrders] = useState<any[]>([]);

    useEffect(() => {
        // Load orders from localStorage
        const loadedOrders = JSON.parse(localStorage.getItem('admin_orders') || '[]');
        setOrders(loadedOrders);
    }, []);

    const clearHistory = () => {
        if (confirm('Are you sure you want to delete all order history?')) {
            localStorage.setItem('admin_orders', '[]');
            setOrders([]);
        }
    };

    return (
        <main style={{ minHeight: '100vh', background: '#000000', color: '#ffffff' }}>
            <Container className="py-5">
                <Link href="/" className="text-decoration-none d-inline-flex align-items-center mb-4" style={{ color: '#888', transition: 'color 0.2s' }}>
                    <ArrowLeft size={18} className="me-2" /> Back to Store
                </Link>

                <div className="d-flex justify-content-between align-items-center mb-5">
                    <div>
                        <h6 style={{ color: '#ff3f6c', letterSpacing: '2px', fontWeight: 600 }}>INTERNAL</h6>
                        <h1 className="display-5 fw-bold" style={{ color: '#ffffff', textShadow: '0 0 15px rgba(255, 63, 108, 0.3)' }}>ADMIN DASHBOARD</h1>
                    </div>
                    <Button
                        variant="outline-danger"
                        onClick={clearHistory}
                        disabled={orders.length === 0}
                        style={{ border: '1px solid #ff3f6c', color: '#ff3f6c', borderRadius: '8px', background: 'transparent' }}
                    >
                        <Trash2 size={18} className="me-2" /> Clear History
                    </Button>
                </div>

                <div style={{
                    background: 'rgba(20, 20, 20, 0.6)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '15px',
                    padding: '24px',
                    border: '1px solid rgba(255, 63, 108, 0.2)',
                    boxShadow: '0 10px 40px rgba(0,0,0,0.5)'
                }}>
                    <h4 className="mb-4 d-flex align-items-center" style={{ color: '#ffffff' }}>
                        <Package className="me-2" style={{ color: '#ff3f6c' }} /> Recent Orders
                    </h4>

                    {orders.length === 0 ? (
                        <div className="text-center py-5" style={{ color: '#666' }}>
                            No orders received yet.
                        </div>
                    ) : (
                        <div className="table-responsive">
                            <Table hover variant="dark" className="align-middle bg-transparent mb-0" style={{ borderCollapse: 'separate', borderSpacing: '0 8px' }}>
                                <thead>
                                    <tr style={{ color: '#ff3f6c', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                        <th style={{ background: 'transparent', borderBottom: '1px solid rgba(255, 63, 108, 0.2)', padding: '12px' }}>Date</th>
                                        <th style={{ background: 'transparent', borderBottom: '1px solid rgba(255, 63, 108, 0.2)', padding: '12px' }}>Customer</th>
                                        <th style={{ background: 'transparent', borderBottom: '1px solid rgba(255, 63, 108, 0.2)', padding: '12px' }}>Items</th>
                                        <th style={{ background: 'transparent', borderBottom: '1px solid rgba(255, 63, 108, 0.2)', padding: '12px' }}>Total</th>
                                        <th style={{ background: 'transparent', borderBottom: '1px solid rgba(255, 63, 108, 0.2)', padding: '12px' }}>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map((order: any, idx) => (
                                        <tr key={idx} style={{ background: 'rgba(255, 255, 255, 0.02)', borderRadius: '8px' }}>
                                            <td style={{ padding: '16px', color: '#888', borderBottom: 'none' }}>{order.date}</td>
                                            <td style={{ padding: '16px', borderBottom: 'none' }}>
                                                <div className="fw-bold text-white">{order.customer.name}</div>
                                                <small style={{ color: '#666' }}>{order.customer.phone}</small>
                                                <div className="small text-truncate" style={{ maxWidth: '200px', color: '#555' }}>{order.customer.address}</div>
                                            </td>
                                            <td style={{ padding: '16px', borderBottom: 'none' }}>
                                                {order.items.map((item: any, i: number) => (
                                                    <div key={i} style={{ color: '#aaa', fontSize: '13px' }}>
                                                        • {item.name}
                                                    </div>
                                                ))}
                                            </td>
                                            <td style={{ padding: '16px', color: '#ff3f6c', fontWeight: 'bold', borderBottom: 'none' }}>{order.total}</td>
                                            <td style={{ padding: '16px', borderBottom: 'none' }}>
                                                <span style={{
                                                    background: 'rgba(255, 63, 108, 0.1)',
                                                    color: '#ff3f6c',
                                                    padding: '4px 12px',
                                                    borderRadius: '20px',
                                                    fontSize: '12px',
                                                    fontWeight: 600,
                                                    border: '1px solid rgba(255, 63, 108, 0.2)'
                                                }}>
                                                    Pending
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    )}
                </div>
            </Container>
            <style jsx global>{`
                .table-hover tbody tr:hover {
                    background: rgba(255, 63, 108, 0.05) !important;
                }
                a:hover {
                    color: #ff3f6c !important;
                }
            `}</style>
        </main>
    );
}
