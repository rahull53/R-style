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
        <Container className="py-5 text-white min-vh-100">
            <Link href="/" className="text-decoration-none text-silver hover:text-white d-inline-flex align-items-center mb-4">
                <ArrowLeft size={18} className="me-2" /> Back to Store
            </Link>

            <div className="d-flex justify-content-between align-items-center mb-5">
                <div>
                    <h6 className="text-gold letter-spacing-2">INTERNAL</h6>
                    <h1 className="display-5 fw-bold">ADMIN DASHBOARD</h1>
                </div>
                <Button variant="outline-danger" onClick={clearHistory} disabled={orders.length === 0}>
                    <Trash2 size={18} className="me-2" /> Clear History
                </Button>
            </div>

            <div className="glass-panel p-4">
                <h4 className="mb-4 d-flex align-items-center">
                    <Package className="text-gold me-2" /> Recent Orders
                </h4>

                {orders.length === 0 ? (
                    <div className="text-center py-5 text-muted">
                        No orders received yet.
                    </div>
                ) : (
                    <div className="table-responsive">
                        <Table hover variant="dark" className="align-middle bg-transparent mb-0">
                            <thead>
                                <tr className="text-silver text-uppercase small">
                                    <th>Date</th>
                                    <th>Customer</th>
                                    <th>Items</th>
                                    <th>Total</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order: any, idx) => (
                                    <tr key={idx} style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
                                        <td>{order.date}</td>
                                        <td>
                                            <div className="fw-bold text-white">{order.customer.name}</div>
                                            <small className="text-muted">{order.customer.phone}</small>
                                            <div className="small text-muted text-truncate" style={{ maxWidth: '200px' }}>{order.customer.address}</div>
                                        </td>
                                        <td>
                                            {order.items.map((item: any, i: number) => (
                                                <div key={i} className="small text-silver">
                                                    • {item.name}
                                                </div>
                                            ))}
                                        </td>
                                        <td className="text-gold fw-bold">{order.total}</td>
                                        <td>
                                            <span className="badge bg-warning text-dark">Pending</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                )}
            </div>
        </Container>
    );
}
