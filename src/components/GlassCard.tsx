"use client";

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface GlassCardProps {
    children: ReactNode;
    className?: string;
    delay?: number;
}

export default function GlassCard({ children, className = "", delay = 0 }: GlassCardProps) {
    return (
        <div
            className={`glass-panel p-4 h-100 ${className}`}
        >
            {children}
        </div>
    );
}
