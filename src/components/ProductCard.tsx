'use client';

import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';
import { Plus } from 'lucide-react';
import LikeButton from './LikeButton';

interface ProductCardProps {
    id: number;
    name: string;
    brand: string;
    price: number;
    image: string;
    tag?: string;
    onAddToCart: () => void;
}

const ProductCard: React.FC<ProductCardProps> = React.memo(({
    id,
    name,
    brand,
    price,
    image,
    tag,
    onAddToCart,
}) => {
    return (
        <StyledWrapper>
            <div className="product-card-container">
                <div className="card__shine" />
                <div className="card__glow" />
                <div className="card__content">
                    {tag && <div className="card__badge">{tag}</div>}

                    {/* Animated Wishlist Button */}
                    <div className="card__wishlist">
                        <LikeButton
                            productId={id}
                            productData={{
                                id,
                                name,
                                price: `₹${price}`,
                                image,
                                brand
                            }}
                        />
                    </div>

                    <Link href={`/product/${id}`} className="card__link">
                        <div className="card__image">
                            <Image
                                src={image}
                                alt={name}
                                fill
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 300px"
                                quality={65}
                                style={{ objectFit: 'cover' }}
                                priority={id <= 4} // Priority for top products
                            />
                        </div>
                        <div className="card__text">
                            <p className="card__title">{brand}</p>
                            <p className="card__description">{name}</p>
                        </div>
                    </Link>

                    <div className="card__footer">
                        <div className="card__price">₹{price}</div>
                        <button
                            className="card__button"
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                onAddToCart();
                            }}
                            suppressHydrationWarning
                        >
                            <Plus size={16} />
                        </button>
                    </div>
                </div>
            </div>
        </StyledWrapper>
    );
});

ProductCard.displayName = 'ProductCard';

const StyledWrapper = styled.div`
    .product-card-container {
        --card-bg: #111111;
        --card-accent: #ff3f6c;
        --card-text: #ffffff;
        --card-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.5);

        width: 100%;
        height: auto;
        background: var(--card-bg);
        border-radius: 12px;
        position: relative;
        overflow: hidden;
        transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        transform: translate3d(0, 0, 0);
        backface-visibility: hidden;
        -webkit-font-smoothing: subpixel-antialiased;
        perspective: 1000px;
        will-change: transform;
        isolation: isolate;
        border: none;
        box-shadow: none; /* Shadow moved to ::after */
        background: var(--card-bg);
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
            Ubuntu, Cantarell, sans-serif;
    }

    /* Pseudo-element for clean border overlay (Fixes white line/gaps) */
    .product-card-container::after {
        content: "";
        position: absolute;
        inset: 0;
        border-radius: inherit;
        border: 1px solid #222222;
        box-shadow: var(--card-shadow);
        pointer-events: none;
        z-index: 20; /* Sit on top of everything to hide gaps */
    }

    .card__shine {
        display: none;
    }

    .card__glow {
        position: absolute;
        inset: -10px;
        background: radial-gradient(
            circle at 50% 0%,
            rgba(255, 63, 108, 0.3) 0%,
            rgba(255, 63, 108, 0) 70%
        );
        opacity: 0;
        transition: opacity 0.5s ease;
        pointer-events: none;
    }

    .card__content {
        padding: 1rem;
        height: 100%;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        position: relative;
        z-index: 2;
    }

    .card__badge {
        position: absolute;
        top: 12px;
        left: 12px;
        background: #ff3f6c;
        color: white;
        padding: 0.25em 0.6em;
        border-radius: 4px;
        font-size: 0.65em;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        transform: scale(0.9);
        opacity: 0.9;
        transition: all 0.4s ease 0.1s;
        z-index: 10;
    }

    .card__wishlist {
        position: absolute;
        top: 8px;
        right: 8px;
        background: #252525;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
        z-index: 10;
        overflow: visible;
        border: 1px solid rgba(255, 63, 108, 0.2);
    }

    .card__link {
        display: block;
        text-decoration: none;
        flex: 1;
    }

    .card__image {
        width: 100%;
        aspect-ratio: 3/4;
        background: linear-gradient(135deg, #1a1a1a 0%, #000000 100%);
        border-radius: 8px;
        transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        position: relative;
        overflow: hidden;
        transform: translate3d(0, 0, 0);
        backface-visibility: hidden;
    }

    .card__image::after {
        content: "";
        position: absolute;
        inset: 0;
        background: linear-gradient(
            180deg,
            transparent 60%,
            rgba(0, 0, 0, 0.03) 100%
        );
        pointer-events: none;
    }

    .card__text {
        display: flex;
        flex-direction: column;
        gap: 0.15em;
        margin-top: 0.75rem;
    }

    .card__title {
        color: var(--card-text);
        font-size: 0.95em;
        margin: 0;
        font-weight: 700;
        transition: all 0.3s ease;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .card__description {
        color: #aaaaaa;
        font-size: 0.8em;
        margin: 0;
        opacity: 0.8;
        transition: all 0.3s ease;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .card__footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: auto;
        padding-top: 0.5rem;
    }

    .card__price {
        color: var(--card-text);
        font-weight: 700;
        font-size: 1.1em;
        transition: all 0.3s ease;
    }

    .card__button {
        width: 36px;
        height: 36px;
        background: var(--card-accent);
        border-radius: 50%;
        border: none;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        cursor: pointer;
        transition: all 0.3s ease;
        transform: scale(0.9);
    }

    /* Hover Effects */
    .product-card-container:hover {
        transform: translateY(-8px);
        box-shadow:
            0 20px 30px -10px rgba(0, 0, 0, 0.12),
            0 10px 10px -5px rgba(0, 0, 0, 0.04);
        border-color: rgba(255, 63, 108, 0.2);
    }

    .product-card-container:hover .card__glow {
        opacity: 1;
    }

    .product-card-container:hover .card__badge {
        transform: scale(1);
        opacity: 1;
    }

    .product-card-container:hover .card__image {
        transform: translateY(-3px) scale(1.02);
        box-shadow: 0 8px 16px -4px rgba(0, 0, 0, 0.12);
    }

    .product-card-container:hover .card__title {
        color: var(--card-accent);
    }

    .product-card-container:hover .card__description {
        opacity: 1;
    }

    .product-card-container:hover .card__price {
        color: var(--card-accent);
    }

    .product-card-container:hover .card__button {
        transform: scale(1);
        box-shadow: 0 0 0 4px rgba(255, 63, 108, 0.2);
    }

    .product-card-container:hover .card__button svg {
        animation: pulse 1.5s infinite;
    }

    /* Active State */
    .product-card-container:active {
        transform: translateY(-4px) scale(0.98);
    }

    /* Animations */
    @keyframes shine {
        0% {
            background-position: -200% 0;
        }
        100% {
            background-position: 200% 0;
        }
    }

    @keyframes pulse {
        0% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.15);
        }
        100% {
            transform: scale(1);
        }
    }
`;

export default ProductCard;
