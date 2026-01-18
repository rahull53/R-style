"use client";

import { createContext, useContext, useState, ReactNode, useEffect, useCallback, useMemo } from 'react';
import { useAsyncStorage } from '@/hooks/useAsyncStorage';

export interface CartItem {
    id: number;
    name: string;
    price: string;
    image?: string;
    brand?: string;
    quantity: number;
    size?: string;
}

interface CartContextType {
    cartItems: CartItem[];
    addToCart: (item: Omit<CartItem, 'quantity'>) => void;
    removeFromCart: (id: number) => void;
    updateQuantity: (id: number, delta: number) => void;
    clearCart: () => void;
    addOrder: (order: any) => void;
    // Wishlist
    wishlistItems: CartItem[];
    addToWishlist: (item: Omit<CartItem, 'quantity'>) => void;
    removeFromWishlist: (id: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [wishlistItems, setWishlistItems] = useState<CartItem[]>([]);
    const { setItemAsync, getItem } = useAsyncStorage();

    // Persistence with debouncing for performance
    useEffect(() => {
        const savedCart = getItem('r_style_cart');
        const savedWishlist = getItem('r_style_wishlist');
        if (savedCart) setCartItems(savedCart);
        if (savedWishlist) setWishlistItems(savedWishlist);
    }, [getItem]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setItemAsync('r_style_cart', cartItems);
            setItemAsync('r_style_wishlist', wishlistItems);
        }, 500); // 500ms debounce
        return () => clearTimeout(timer);
    }, [cartItems, wishlistItems, setItemAsync]);

    const addToCart = useCallback((item: Omit<CartItem, 'quantity'>) => {
        setCartItems(prev => {
            const exists = prev.find(i => i.id === item.id && i.size === item.size);
            if (exists) {
                return prev.map(i => i.id === item.id && i.size === item.size ? { ...i, quantity: i.quantity + 1 } : i);
            }
            return [...prev, { ...item, quantity: 1 }];
        });
    }, []);

    const removeFromCart = useCallback((id: number) => {
        setCartItems(prev => prev.filter(item => item.id !== id));
    }, []);

    const updateQuantity = useCallback((id: number, delta: number) => {
        setCartItems(prev => prev.map(item => {
            if (item.id === id) {
                const newQty = item.quantity + delta;
                if (newQty >= 1 && newQty <= 10) {
                    return { ...item, quantity: newQty };
                }
            }
            return item;
        }));
    }, []);

    const addToWishlist = useCallback((item: Omit<CartItem, 'quantity'>) => {
        setWishlistItems(prev => {
            if (!prev.find(i => i.id === item.id)) {
                return [...prev, { ...item, quantity: 1 }];
            }
            return prev;
        });
    }, []);

    const removeFromWishlist = useCallback((id: number) => {
        setWishlistItems(prev => prev.filter(item => item.id !== id));
    }, []);

    const clearCart = useCallback(() => {
        setCartItems([]);
    }, []);

    const addOrder = useCallback(async (order: any) => {
        // 1. Save to Firebase (Real Persistence)
        // Dynamically import to safely use in client context without heavy initial load if desired, 
        // but here standard import is fine. For now let's just call it.
        const { createOrder } = await import('@/lib/db/orders');
        await createOrder(order);

        // 2. Keep local admin simulation for now (optional, can be removed later)
        const existingOrders = JSON.parse(localStorage.getItem('admin_orders') || '[]');
        const newOrder = { ...order, id: Date.now(), date: new Date().toLocaleString() };
        existingOrders.unshift(newOrder);
        localStorage.setItem('admin_orders', JSON.stringify(existingOrders));

        // 3. Clear cart
        clearCart();
    }, [clearCart]);

    const value = useMemo(() => ({
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        addOrder,
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
    }), [cartItems, wishlistItems, addToCart, removeFromCart, updateQuantity, clearCart, addOrder, addToWishlist, removeFromWishlist]);

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
