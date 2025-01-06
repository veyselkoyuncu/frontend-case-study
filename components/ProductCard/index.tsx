'use client';

import React from 'react';
import Link from 'next/link';
import { Product } from '@/interfaces/product';
import Image from 'next/image';

interface ProductCardProps {
    product: Product;
    onAddToCart: (product: Product) => void;
}

const formatPrice = (price: number) => {
    return new Intl.NumberFormat('tr-TR', {
        style: 'currency',
        currency: 'TRY',
    }).format(price);
};

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
    return (
        <div className="border h-[350px] border-gray-200 shadow-md  p-2 flex flex-col items-center cursor-pointer hover:shadow-lg transition-shadow">
            <Link href={`/product/${product.id}`} className="w-full flex flex-col gap-2 pb-2 ">
                <Image
                    src={product.image}
                    alt={product.name}
                    width={160}
                    height={150}
                    className="w-full lg:w-[200px] h-[180px] object-cover mb-4 "
                />
                <p className="text-sm text-blue-600">{formatPrice(product.price)}</p>
                <h2 className="text-lg font-medium line-clamp-2 text-gray-800">{product.name}</h2>
            </Link>
            <button
                onClick={() => {
                    onAddToCart(product);
                }}
                className="mt-auto bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
            >
                Add To Cart
            </button>
        </div>
    );
};

export default ProductCard;
