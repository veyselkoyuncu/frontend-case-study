"use client";

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    selectCartItems,
    selectCartTotalPrice,
    updateCartQuantity,
} from "@/store/cartSlice";

interface CartProps {
    hideHeaders?: boolean;
}

const Cart: React.FC<CartProps> = ({ hideHeaders = false }) => {
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);
    const totalPrice = useSelector(selectCartTotalPrice);

    const handleIncrease = (id: string) => {
        dispatch(updateCartQuantity({ id, quantityChange: 1 }));
    };

    const handleDecrease = (id: string) => {
        dispatch(updateCartQuantity({ id, quantityChange: -1 }));
    };

    return (
        <div className="mx-auto">
            {!hideHeaders && (
                <h2 className="text-[#333333B2] text-[12px] mb-4">Cart</h2>
            )}
            <div className="bg-white shadow-md p-4 mb-4 min-h-36 max-h-[350px] overflow-auto">
                {cartItems.length === 0 ? (
                    <p className="text-center text-gray-500">Your cart is empty</p>
                ) : (
                    <ul className="divide-y divide-gray-200">
                        {cartItems.map((item) => (
                            <li
                                key={item.id}
                                className="flex items-center justify-between py-4"
                            >
                                <div>
                                    <p>{item.name}</p>
                                    <p className="text-sm text-blue-500">
                                        {item.price} ₺
                                    </p>
                                </div>
                                <div className="flex items-center">
                                    <button
                                        onClick={() => handleDecrease(item.id)}
                                        className="w-8 h-8 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                                    >
                                        -
                                    </button>
                                    <span
                                        className="w-8 h-8 font-medium text-white text-center bg-blue-500 flex items-center justify-center"
                                    >
                                        {item.quantity}
                                    </span>
                                    <button
                                        onClick={() => handleIncrease(item.id)}
                                        className="w-8 h-8 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                                    >
                                        +
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {!hideHeaders && (
                <h2 className="text-[#333333B2] text-[12px] mb-4">Checkout</h2>
            )}
            <div className="bg-white shadow-md p-6">
                <div className="flex justify-between items-center mb-4">
                    <span className="font-medium text-gray-700">Total Price:</span>
                    <span className="text-lg font-bold text-gray-800">
                        {totalPrice} ₺
                    </span>
                </div>
                <button
                    className={`w-full py-2 rounded ${
                        cartItems.length === 0
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                            : "bg-blue-500 text-white hover:bg-blue-600"
                    }`}
                    disabled={cartItems.length === 0}
                >
                    Checkout
                </button>
            </div>
        </div>
    );
};

export default Cart;
