"use client";

import dynamic from 'next/dynamic';

const CartSidebar = dynamic(() => import("@/components/CartSidebar"), { ssr: false });
const SearchModal = dynamic(() => import("@/components/SearchModal"), { ssr: false });
const AuthModal = dynamic(() => import("@/components/AuthModal"), { ssr: false });
const CheckoutModal = dynamic(() => import("@/components/CheckoutModal"), { ssr: false });
const WishlistModal = dynamic(() => import("@/components/WishlistModal"), { ssr: false });
const ProfileModal = dynamic(() => import("@/components/ProfileModal"), { ssr: false });

import { useCart } from '@/context/CartContext';
import { useUI } from '@/context/UIContext';

export default function ClientModals() {
    const { isCheckoutOpen, setIsCheckoutOpen } = useUI();

    return (
        <>
            <CartSidebar />
            <SearchModal />
            <AuthModal />
            <WishlistModal />
            <ProfileModal />
            <CheckoutModal show={isCheckoutOpen} onHide={() => setIsCheckoutOpen(false)} />
        </>
    );
}
