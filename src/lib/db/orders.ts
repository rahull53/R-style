import { db } from "../firebase";
import { collection, addDoc, query, where, getDocs, orderBy, serverTimestamp } from "firebase/firestore";

const ORDERS_COLLECTION = "orders";

export interface OrderData {
    customer: {
        name: string;
        address: string;
        phone: string;
    };
    items: any[];
    total: string;
    status: string;
    createdAt?: any;
    id?: string;
}

export async function createOrder(orderData: Omit<OrderData, 'createdAt'>) {
    try {
        const docRef = await addDoc(collection(db, ORDERS_COLLECTION), {
            ...orderData,
            createdAt: serverTimestamp()
        });
        return { success: true, id: docRef.id };
    } catch (error) {
        console.error("Error creating order:", error);
        return { success: false, error };
    }
}

export async function getUserOrders(identifier: string) {
    try {
        const ordersRef = collection(db, ORDERS_COLLECTION);

        // Query orders where customer.phone matches OR customer.email matches (handled by simple string match for now)
        // Since we unified the 'phone' field in checkout to store either phone or email, we just query that field.
        const q = query(
            ordersRef,
            where("customer.phone", "==", identifier),
            orderBy("createdAt", "desc")
        );

        const querySnapshot = await getDocs(q);
        const orders: OrderData[] = [];
        querySnapshot.forEach((doc) => {
            orders.push({ id: doc.id, ...doc.data() } as OrderData);
        });

        return { success: true, orders };
    } catch (error) {
        console.error("Error fetching user orders:", error);
        return { success: false, error };
    }
}
