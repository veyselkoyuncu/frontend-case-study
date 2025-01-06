"use client";

import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import {
    fetchProducts,
    applyFilters,
    selectFilteredProducts,
    selectLoading,
} from "@/store/productSlice";
import useAppDispatch from "@/hooks/useAppDispatch";
import ProductCard from "@/components/ProductCard";
import Pagination from "@/components/Pagination";
import { addToCart } from "@/store/cartSlice";
import { Product } from "@/interfaces/product";

const ProductListContainer = () => {
    const dispatch = useAppDispatch();
    const products = useSelector(selectFilteredProducts);
    const loading = useSelector(selectLoading);

    useEffect(() => {
        dispatch(fetchProducts()).then(() => {
            dispatch(applyFilters());
        });
    }, [dispatch]);

    const handleAddToCart = (product: Product) => {
        dispatch(addToCart({ ...product, quantity: 1 }));
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="px-4">
            <div className="grid min-h-[900px] grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
                ))}
            </div>
            <div className="mt-6">
                <Pagination />
            </div>
        </div>
    );
};

export default ProductListContainer;
