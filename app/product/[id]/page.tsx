import React from "react";
import ProductDetailContent from "@/components/ProductDetail";
import Cart from "@/components/Cart";

async function fetchProduct(id: string) {
    const res = await fetch(
        `https://5fc9346b2af77700165ae514.mockapi.io/products/${id}`
    );
    if (!res.ok) {
        throw new Error("Failed to fetch product");
    }
    return res.json();
}

export default async function ProductDetail({
                                                params,
                                            }: {
    params: { id: string };
}) {
    const product = await fetchProduct(params.id);

    return (
        <div className="w-full flex justify-center p-6 bg-gray-100">
            <div className="max-w-[1440px] w-full grid grid-cols-1 md:grid-cols-[3fr_1fr] gap-4">
                <ProductDetailContent product={product} />
                <div className="hidden md:block space-y-6">
                    <Cart hideHeaders={true} />
                </div>
            </div>
        </div>
    );
}
