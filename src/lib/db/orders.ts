import { db } from "../firebase";
import { collection, addDoc, query, where, getDocs, orderBy, serverTimestamp, limit } from "firebase/firestore";

const ORDERS_COLLECTION = "orders";

export interface OrderData {
    customer: {
        name: string;
        address: string;
        phone: string;
        email?: string;
        mobile?: string;
    };
    items: any[];
    total: string;
    status: string;
    createdAt?: any;
    id?: string;
}

export async function createOrder(orderData: Omit<OrderData, 'createdAt'>) {
    try {
        console.log("Attempting to create order:", orderData);
        const docRef = await addDoc(collection(db, ORDERS_COLLECTION), {
            ...orderData,
            createdAt: serverTimestamp()
        });
        console.log("Order created successfully with ID:", docRef.id);
        return { success: true, id: docRef.id };
    } catch (error: any) {
        console.error("Error creating order:", error);
        return { success: false, error: error.message || error };
    }
}

export async function getUserOrders(identifier: string) {
    try {
        console.log("Fetching orders for identifier:", identifier);
        const ordersRef = collection(db, ORDERS_COLLECTION);

        let q;
        // Optimization: Try simpler query first to rule out index issues
        try {
            // First try with sorting (requires index)
            q = query(
                ordersRef,
                where("customer.phone", "==", identifier),
                orderBy("createdAt", "desc")
            );
        } catch (e) {
            // Fallback
            q = query(
                ordersRef,
                where("customer.phone", "==", identifier)
            );
        }

        // Actually, let's just try without sort first to see if data appears
        // If this works, then the index is the problem.
        // We can do CLIENT-SIDE sorting for now.
        const simpleQ = query(
            ordersRef,
            where("customer.phone", "==", identifier)
        );

        const querySnapshot = await getDocs(simpleQ);
        const orders: OrderData[] = [];
        querySnapshot.forEach((doc) => {
            orders.push({ id: doc.id, ...doc.data() } as OrderData);
        });

        // Client-side sort
        orders.sort((a, b) => {
            const dateA = a.createdAt?.seconds || 0;
            const dateB = b.createdAt?.seconds || 0;
            return dateB - dateA;
        });

        console.log(`Found ${orders.length} orders for ${identifier}`);
        return { success: true, orders };
    } catch (error: any) {
        console.error("Error fetching user orders:", error);
        return { success: false, error: error.message || error };
    }
}

// Debug helper
export async function getAllOrders() {
    try {
        const ordersRef = collection(db, ORDERS_COLLECTION);
        // Remove sorting temporarily to debug raw data access
        const q = query(ordersRef, limit(20));

        const querySnapshot = await getDocs(q);
        const orders: OrderData[] = [];
        querySnapshot.forEach((doc) => {
            orders.push({ id: doc.id, ...doc.data() } as OrderData);
        });
        return { success: true, orders };
    } catch (error: any) {
        console.error("Error fetching all orders:", error);
        return { success: false, error: error.message || error };
    }
}
