"use client";

import { useCallback } from 'react';

/**
 * A custom hook to interact with localStorage in a non-blocking way.
 * Uses queueMicrotask for the write operation to ensure the UI remains responsive.
 */
export function useAsyncStorage() {
    const setItemAsync = useCallback((key: string, value: any) => {
        const stringValue = typeof value === 'string' ? value : JSON.stringify(value);

        // Use queueMicrotask to defer the write until the main thread is clear
        // This prevents the synchronous write from blocking the frame
        queueMicrotask(() => {
            try {
                localStorage.setItem(key, stringValue);
            } catch (error) {
                console.error(`AsyncStorage Error [${key}]:`, error);
            }
        });
    }, []);

    const getItem = useCallback((key: string) => {
        try {
            const item = localStorage.getItem(key);
            if (!item) return null;
            try {
                return JSON.parse(item);
            } catch {
                return item;
            }
        } catch (error) {
            console.error(`AsyncStorage Get Error [${key}]:`, error);
            return null;
        }
    }, []);

    return { setItemAsync, getItem };
}
