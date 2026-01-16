"use client";

import dynamic from 'next/dynamic';

const CartSidebar = dynamic(() => import("@/components/CartSidebar"), { ssr: false });
const SearchModal = dynamic(() => import("@/components/SearchModal"), { ssr: false });
const AuthModal = dynamic(() => import("@/components/AuthModal"), { ssr: false });

export default function ClientModals() {
    return (
        <>
            <CartSidebar />
            <SearchModal />
            <AuthModal />
        </>
    );
}
