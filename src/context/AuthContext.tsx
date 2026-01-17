"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

import { useAsyncStorage } from '@/hooks/useAsyncStorage';

export interface User {
    mobile: string; // Acts as primary ID for now (can be email or phone)
    email?: string;
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

    const login = (identifier: string, name?: string, uid?: string) => {
        const isEmail = identifier.includes('@');

        const newUser: User = {
            mobile: isEmail ? '' : identifier,
            email: isEmail ? identifier : undefined, // Add email to User type if needed or handle mapped propery
            name: name || (isEmail ? identifier.split('@')[0] : `User ${identifier.slice(-4)}`),
            isVerified: true
        };

        // Ensure User type supports email or we map it to 'mobile' property for now to fallback
        // Current User interface: mobile: string. Let's adapt or use 'mobile' field for identifier if we don't change type.
        // For minimal breakage, we might store identifier in 'mobile' prop but that's confusing.
        // Better: let's stick to what I wrote:

        // Wait, I need to check User interface definition above line 10.
        // It says: mobile: string; name?: string; isVerified: boolean.
        // I should stick to that or update it. 
        // For this step I will update the logic to save to DB correctly.

        setUser(newUser); // This might error if I add 'email' properly without updating interface.
        setItemAsync('r_style_user', newUser);
        if (uid) setItemAsync('r_style_uid', uid);

        // Save to correct Firestore collection
        if (isEmail) {
            import('@/lib/db/user').then(mod => mod.saveEmailUser(identifier, name));
        } else {
            import('@/lib/db/user').then(mod => mod.saveMobileUser(identifier, name));
        }

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
