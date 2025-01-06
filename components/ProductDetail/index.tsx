"use client";

import React from "react";
import { Product } from "@/interfaces/product";
import { useDispatch } from "react-redux";
import { addToCart } from "@/store/cartSlice";
import Image from "next/image";

interface ProductDetailContentProps {
    product: Product;
}

const ProductDetailContent: React.FC<ProductDetailContentProps> = ({
                                                                       product,
                                                                   }) => {
    const dispatch = useDispatch();

    const handleAddToCart = () => {
        dispatch(
            addToCart({
                id: product.id,
                name: product.name,
                price: product.price,
                quantity: 1,
            })
        );
    };

    return (
        <div className="bg-white shadow-md gap-4 p-6 flex flex-col md:flex-row">
            <Image
                src={product.image}
                alt={product.name}
                width={800}
                height={400}
                className="max-w-full md:max-w-[600px] h-full object-cover mb-6 md:mb-0 "
            />
            <div className="flex flex-col flex-grow">
                <h1 className="text-2xl   mb-4">
                    {product.name}
                </h1>
                <p className="text-blue-500 text-2xl font-medium mb-16">
                    {new Intl.NumberFormat("tr-TR", {
                        style: "currency",
                        currency: "TRY",
                    }).format(product.price)}
                </p>
                <button
                    onClick={handleAddToCart}
                    className="bg-blue-500 text-lg font-bold text-white py-2 px-6 rounded hover:bg-blue-600 mb-6"
                >
                    Add to Cart
                </button>
                <p className=" text-lg leading-relaxed">
                    {product.description ||
                        "No description available for this product."}
                </p>
            </div>
        </div>
    );
};

export default ProductDetailContent;
