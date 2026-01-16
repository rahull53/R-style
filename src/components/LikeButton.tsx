import React from 'react';
import styled from 'styled-components';
import { useCart } from '@/context/CartContext';

interface LikeButtonProps {
    productId: number;
    productData: {
        id: number;
        name: string;
        price: string;
        image?: string;
        brand?: string;
    };
}

const LikeButton: React.FC<LikeButtonProps> = React.memo(({ productId, productData }) => {
    const { wishlistItems, addToWishlist, removeFromWishlist } = useCart();
    const isLiked = wishlistItems.some(item => item.id === productId);

    // Optimistic UI state
    const [localIsLiked, setLocalIsLiked] = React.useState(isLiked);

    // Sync with prop when it changes from external source (e.g. from WishlistModal)
    React.useEffect(() => {
        setLocalIsLiked(isLiked);
    }, [isLiked]);

    const handleToggle = (e: React.MouseEvent | React.ChangeEvent) => {
        const newValue = !localIsLiked;
        setLocalIsLiked(newValue); // Instant feedback

        if (isLiked) {
            removeFromWishlist(productId);
        } else {
            addToWishlist(productData);
        }
    };

    return (
        <StyledWrapper>
            <label className="ui-bookmark" onClick={(e) => e.stopPropagation()}>
                <input
                    type="checkbox"
                    checked={localIsLiked}
                    onChange={handleToggle}
                    suppressHydrationWarning
                />
                <div className="bookmark">
                    <svg viewBox="0 0 16 16" style={{ marginTop: 4 }} className="bi bi-heart-fill" height={25} width={25} xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314" fillRule="evenodd" />
                    </svg>
                </div>
            </label>
        </StyledWrapper>
    );
});

LikeButton.displayName = 'LikeButton';

const StyledWrapper = styled.div`
    .ui-bookmark {
        --icon-size: 24px;
        --icon-secondary-color: rgb(77, 77, 77);
        --icon-hover-color: rgb(97, 97, 97);
        --icon-primary-color: #ff3f6c;
        --icon-circle-border: 1px solid var(--icon-primary-color);
        --icon-circle-size: 35px;
        --icon-anmt-duration: 0.3s;
    }

    .ui-bookmark input {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        display: none;
    }

    .ui-bookmark .bookmark {
        width: var(--icon-size);
        height: auto;
        fill: var(--icon-secondary-color);
        cursor: pointer;
        transition: 0.2s;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        transform-origin: top;
    }

    .bookmark::after {
        content: "";
        position: absolute;
        width: 10px;
        height: 10px;
        box-shadow: 0 30px 0 -4px var(--icon-primary-color),
            30px 0 0 -4px var(--icon-primary-color),
            0 -30px 0 -4px var(--icon-primary-color),
            -30px 0 0 -4px var(--icon-primary-color),
            -22px 22px 0 -4px var(--icon-primary-color),
            -22px -22px 0 -4px var(--icon-primary-color),
            22px -22px 0 -4px var(--icon-primary-color),
            22px 22px 0 -4px var(--icon-primary-color);
        border-radius: 50%;
        transform: scale(0);
        padding: 1px;
    }

    .bookmark::before {
        content: "";
        position: absolute;
        border-radius: 50%;
        border: var(--icon-circle-border);
        opacity: 0;
    }

    .ui-bookmark:hover .bookmark {
        fill: var(--icon-hover-color);
    }

    .ui-bookmark input:checked + .bookmark::after {
        animation: circles var(--icon-anmt-duration)
            cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        animation-delay: var(--icon-anmt-duration);
    }

    .ui-bookmark input:checked + .bookmark {
        fill: var(--icon-primary-color);
        animation: bookmark var(--icon-anmt-duration) forwards;
        transition-delay: 0.3s;
    }

    .ui-bookmark input:checked + .bookmark::before {
        animation: circle var(--icon-anmt-duration)
            cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        animation-delay: var(--icon-anmt-duration);
    }

    @keyframes bookmark {
        50% {
            transform: scaleY(0.6);
        }
        100% {
            transform: scaleY(1);
        }
    }

    @keyframes circle {
        from {
            width: 0;
            height: 0;
            opacity: 0;
        }
        90% {
            width: var(--icon-circle-size);
            height: var(--icon-circle-size);
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }

    @keyframes circles {
        from {
            transform: scale(0);
        }
        40% {
            opacity: 1;
        }
        to {
            transform: scale(0.8);
            opacity: 0;
        }
    }
`;

export default LikeButton;
