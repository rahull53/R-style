"use client";

import { createContext, useContext, useState, ReactNode, useMemo } from 'react';

interface UIContextType {
    isCartOpen: boolean;
    setIsCartOpen: (isOpen: boolean) => void;
    isSearchOpen: boolean;
    setIsSearchOpen: (isOpen: boolean) => void;
    isWishlistOpen: boolean;
    setIsWishlistOpen: (isOpen: boolean) => void;
    isProfileOpen: boolean;
    setIsProfileOpen: (isOpen: boolean) => void;
    isCheckoutOpen: boolean;
    setIsCheckoutOpen: (isOpen: boolean) => void;
    isMenuOpen: boolean;
    setIsMenuOpen: (isOpen: boolean) => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export function UIProvider({ children }: { children: ReactNode }) {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isWishlistOpen, setIsWishlistOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const value = useMemo(() => ({
        isCartOpen,
        setIsCartOpen,
        isSearchOpen,
        setIsSearchOpen,
        isWishlistOpen,
        setIsWishlistOpen,
        isProfileOpen,
        setIsProfileOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isMenuOpen,
        setIsMenuOpen
    }), [isCartOpen, isSearchOpen, isWishlistOpen, isProfileOpen, isCheckoutOpen, isMenuOpen]);

    return (
        <UIContext.Provider value={value}>
            {children}
        </UIContext.Provider>
    );
}

export function useUI() {
    const context = useContext(UIContext);
    if (context === undefined) {
        throw new Error('useUI must be used within a UIProvider');
    }
    return context;
}
