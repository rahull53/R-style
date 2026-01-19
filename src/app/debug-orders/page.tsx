"use client";

import { useEffect, useState } from 'react';
import { getAllOrders, OrderData } from '@/lib/db/orders';

export default function DebugOrdersPage() {
    const [orders, setOrders] = useState<OrderData[]>([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getAllOrders().then(res => {
            setLoading(false);
            if (res.success && res.orders) {
                setOrders(res.orders);
            } else {
                setError(JSON.stringify(res.error));
            }
        });
    }, []);

    if (loading) return <div style={{ padding: 20, color: 'white' }}>Loading...</div>;

    const createTestOrder = async () => {
        try {
            // Dynamically import to use the function
            const { createOrder } = await import('@/lib/db/orders');
            const testData = {
                customer: {
                    name: "Test User",
                    address: "Test Address",
                    phone: "test@test.com",
                    email: "test@test.com",
                    mobile: ""
                },
                items: [{ name: "Test Item", price: "₹100", quantity: 1 }],
                total: "₹100",
                status: "Pending"
            };
            const res = await createOrder(testData);
            if (res.success) {
                alert("Test Order Created! ID: " + res.id);
                // Refresh list
                getAllOrders().then(res => {
                    if (res.success && res.orders) setOrders(res.orders);
                });
            } else {
                alert("Failed to create order: " + JSON.stringify(res.error));
            }
        } catch (e: any) {
            alert("Error calling createOrder: " + e.message);
        }
    };

    return (
        <div style={{ padding: 20, color: 'white', background: '#000', minHeight: '100vh', fontFamily: 'monospace' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1>Debug Orders</h1>
                <button
                    onClick={createTestOrder}
                    style={{ padding: '10px 20px', background: 'red', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer' }}
                >
                    Create Test Order
                </button>
            </div>
            {error && <div style={{ color: 'red', marginBottom: 20 }}>Error: {error}</div>}

            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ textAlign: 'left', borderBottom: '1px solid #333' }}>
                        <th>ID</th>
                        <th>Customer Name</th>
                        <th>Customer Phone</th>
                        <th>Customer Email</th>
                        <th>Total</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(o => (
                        <tr key={o.id} style={{ borderBottom: '1px solid #222' }}>
                            <td>{o.id?.slice(0, 5)}</td>
                            <td>{o.customer?.name}</td>
                            <td style={{ color: '#ff3f6c' }}>{o.customer?.phone}</td>
                            <td style={{ color: '#3b82f6' }}>{o.customer?.email || '-'}</td>
                            <td>{o.total}</td>
                            <td>{o.createdAt ? new Date(o.createdAt.seconds * 1000).toLocaleString() : 'N/A'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
