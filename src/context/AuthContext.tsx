"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { saveUserWithMobile } from '@/lib/db/user';
import { useAsyncStorage } from '@/hooks/useAsyncStorage';

export interface User {
    mobile: string;
    name?: string;
    isVerified: boolean;
}

interface AuthContextType {
    user: User | null;
    isAuthModalOpen: boolean;
    setIsAuthModalOpen: (isOpen: boolean) => void;
    login: (mobile: string, name?: string) => void;
    logout: () => void;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const { setItemAsync, getItem } = useAsyncStorage();

    // Load user from localStorage on mount
    useEffect(() => {
        const savedUser = getItem('r_style_user');
        if (savedUser) {
            setUser(savedUser);
        }
        setIsLoading(false);
    }, [getItem]);

    const login = (mobile: string, name?: string, uid?: string) => {
        const newUser: User = {
            mobile,
            name: name || `User ${mobile.slice(-4)}`,
            isVerified: true
        };
        setUser(newUser);
        setItemAsync('r_style_user', newUser);
        if (uid) setItemAsync('r_style_uid', uid);
        // Save to Firestore (Async - don't await to keep UI snappy)
        saveUserWithMobile(mobile, name);

        setIsAuthModalOpen(false);
    };

    const logout = () => {
        setUser(null);
        setItemAsync('r_style_user', null);
        setItemAsync('r_style_uid', null);
    };

    return (
        <AuthContext.Provider value={{
            user,
            isAuthModalOpen,
            setIsAuthModalOpen,
            login,
            logout,
            isLoading
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
