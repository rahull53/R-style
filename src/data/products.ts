export interface SizeInfo {
    size: string;
    stock: number;
}

export interface Product {
    id: number;
    brand: string;
    name: string;
    price: number;
    originalPrice: number;
    discount: string;
    tag: string;
    image: string;
    description?: string;
    rating?: number;
    category?: string;
    sizes?: SizeInfo[];
}

export const products: Product[] = [
    {
        id: 1,
        brand: "R Style",
        name: "Floral Drop Earrings",
        price: 499,
        originalPrice: 999,
        discount: "50% OFF",
        tag: "Trending",
        image: "/images/earrings.png",
        description: "Elegant floral drop earrings perfect for any occasion. Crafted with precision and style.",
        rating: 4.5,
        category: "Accessories"
    },
    {
        id: 2,
        brand: "Urban Edge",
        name: "Leather Wallet Brown",
        price: 899,
        originalPrice: 1499,
        discount: "40% OFF",
        tag: "Best Seller",
        image: "/images/wallet.png",
        description: "Genuine leather wallet with multiple card slots and a sleek design.",
        rating: 4.7,
        category: "Accessories"
    },
    {
        id: 3,
        brand: "SunStyle",
        name: "Aviator Sunglasses Gold",
        price: 1299,
        originalPrice: 2199,
        discount: "41% OFF",
        tag: "New",
        image: "/images/sunglasses.png",
        description: "Classic aviator sunglasses with gold frames and UV protection.",
        rating: 4.8,
        category: "Accessories"
    },
    {
        id: 4,
        brand: "StepUp",
        name: "Canvas Sneakers White",
        price: 1599,
        originalPrice: 2999,
        discount: "47% OFF",
        tag: "Popular",
        image: "/images/sneakers.png",
        description: "Comfortable white canvas sneakers for everyday wear.",
        rating: 4.6,
        category: "Footwear",
        sizes: [
            { size: "6", stock: 5 },
            { size: "7", stock: 3 },
            { size: "8", stock: 8 },
            { size: "9", stock: 2 },
            { size: "10", stock: 0 }
        ]
    },
    {
        id: 5,
        brand: "ChicBags",
        name: "Tote Bag Beige",
        price: 799,
        originalPrice: 1299,
        discount: "38% OFF",
        tag: "",
        image: "/images/tote.png",
        description: "Spacious beige tote bag, perfect for work or shopping.",
        rating: 4.4,
        category: "Accessories"
    },
    {
        id: 6,
        brand: "TimeMaster",
        name: "Classic Analog Watch",
        price: 2499,
        originalPrice: 4999,
        discount: "50% OFF",
        tag: "Premium",
        image: "/images/watch.png",
        description: "Timeless analog watch with a leather strap and minimalist dial.",
        rating: 4.9,
        category: "Accessories"
    },
    {
        id: 7,
        brand: "StyleChain",
        name: "Gold Chain Necklace",
        price: 699,
        originalPrice: 1199,
        discount: "42% OFF",
        tag: "",
        image: "/images/gold_chain.png",
        description: "Simple yet elegant gold chain necklace to elevate your look.",
        rating: 4.3,
        category: "Accessories"
    },
    {
        id: 8,
        brand: "BeltCraft",
        name: "Leather Belt Black",
        price: 599,
        originalPrice: 999,
        discount: "40% OFF",
        tag: "New",
        image: "/images/belt.png",
        description: "Durable black leather belt with a classic buckle.",
        rating: 4.5,
        category: "Accessories"
    },
    // Clothing Products
    {
        id: 9,
        brand: "UrbanStyle",
        name: "Premium Leather Jacket",
        price: 2999,
        originalPrice: 5999,
        discount: "50% OFF",
        tag: "Best Seller",
        image: "/images/leather_jacket.png",
        description: "Classic premium leather jacket with a sleek design. Perfect for casual and semi-formal occasions.",
        rating: 4.8,
        category: "Clothing",
        sizes: [
            { size: "S", stock: 2 },
            { size: "M", stock: 5 },
            { size: "L", stock: 3 },
            { size: "XL", stock: 1 },
            { size: "XXL", stock: 0 }
        ]
    },
    {
        id: 10,
        brand: "BasicWear",
        name: "Cotton Crew Neck T-Shirt",
        price: 499,
        originalPrice: 999,
        discount: "50% OFF",
        tag: "Trending",
        image: "/images/black_tee.png",
        description: "Soft cotton t-shirt with a comfortable fit. Essential wardrobe staple for everyday wear.",
        rating: 4.6,
        category: "Clothing",
        sizes: [
            { size: "S", stock: 10 },
            { size: "M", stock: 8 },
            { size: "L", stock: 6 },
            { size: "XL", stock: 4 },
            { size: "XXL", stock: 2 }
        ]
    },
    {
        id: 11,
        brand: "ActiveFit",
        name: "Athletic Running Shoes",
        price: 1899,
        originalPrice: 3499,
        discount: "46% OFF",
        tag: "Popular",
        image: "/images/athletic_shoes.png",
        description: "Lightweight athletic shoes designed for running and sports activities.",
        rating: 4.7,
        category: "Footwear",
        sizes: [
            { size: "7", stock: 4 },
            { size: "8", stock: 6 },
            { size: "9", stock: 3 },
            { size: "10", stock: 5 },
            { size: "11", stock: 2 }
        ]
    }
];
