"use client";

import { createContext, useContext, useState, ReactNode } from 'react';

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
    isCartOpen: boolean;
    setIsCartOpen: (isOpen: boolean) => void;
    isSearchOpen: boolean;
    setIsSearchOpen: (isOpen: boolean) => void;
    // Wishlist
    wishlistItems: CartItem[];
    addToWishlist: (item: Omit<CartItem, 'quantity'>) => void;
    removeFromWishlist: (id: number) => void;
    isWishlistOpen: boolean;
    setIsWishlistOpen: (isOpen: boolean) => void;
    isProfileOpen: boolean;
    setIsProfileOpen: (isOpen: boolean) => void;
    // Checkout
    isCheckoutOpen: boolean;
    setIsCheckoutOpen: (isOpen: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    // Wishlist states
    const [wishlistItems, setWishlistItems] = useState<CartItem[]>([]);
    const [isWishlistOpen, setIsWishlistOpen] = useState(false);

    // Profile state
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    // Checkout state
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

    const addToCart = (item: Omit<CartItem, 'quantity'>) => {
        // Check if item already exists
        const exists = cartItems.some(i => i.id === item.id);
        if (!exists) {
            setCartItems(prev => [...prev, { ...item, quantity: 1 }]);
        }
        setIsCartOpen(true);
    };

    const removeFromCart = (id: number) => {
        setCartItems(prev => prev.filter(item => item.id !== id));
    };

    const updateQuantity = (id: number, delta: number) => {
        setCartItems(prev => prev.map(item => {
            if (item.id === id) {
                const newQty = item.quantity + delta;
                // Boundary: 1 to 10
                if (newQty >= 1 && newQty <= 10) {
                    return { ...item, quantity: newQty };
                }
            }
            return item;
        }));
    };

    const addToWishlist = (item: Omit<CartItem, 'quantity'>) => {
        if (!wishlistItems.find(i => i.id === item.id)) {
            setWishlistItems(prev => [...prev, { ...item, quantity: 1 }]);
        }
    };

    const removeFromWishlist = (id: number) => {
        setWishlistItems(prev => prev.filter(item => item.id !== id));
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const addOrder = (order: any) => {
        const existingOrders = JSON.parse(localStorage.getItem('admin_orders') || '[]');
        const newOrder = { ...order, id: Date.now(), date: new Date().toLocaleString() };
        existingOrders.unshift(newOrder);
        localStorage.setItem('admin_orders', JSON.stringify(existingOrders));
        clearCart();
    };

    return (
        <CartContext.Provider value={{
            cartItems,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            addOrder,
            isCartOpen,
            setIsCartOpen,
            isSearchOpen,
            setIsSearchOpen,
            wishlistItems,
            addToWishlist,
            removeFromWishlist,
            isWishlistOpen,
            setIsWishlistOpen,
            isProfileOpen,
            setIsProfileOpen,
            isCheckoutOpen,
            setIsCheckoutOpen
        }}>
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
