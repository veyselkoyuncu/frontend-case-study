"use client";

import React, { useState } from "react";
import ProfileIcon from "@/public/Profile.svg";
import PortfeilIcon from "@/public/Portfeil.svg";
import SearchInput from "@/components/SearchInput";
import Cart from "@/components/Cart";
import { useSelector } from "react-redux";
import { selectCartTotalPrice } from "@/store/cartSlice";
import Link from "next/link";
import SearchIcon from "@/public/search-icon.svg";
import CloseIcon from "@/public/close-icon.svg";

const Header = () => {
    const [isSearchActive, setIsSearchActive] = useState(false);
    const [isCartActive, setIsCartActive] = useState(false);
    const totalPrice = useSelector(selectCartTotalPrice);

    const toggleSearch = () => {
        setIsSearchActive((prev) => !prev);
    };

    const toggleCart = () => {
        setIsCartActive((prev) => !prev);
    };

    return (
        <header className="bg-blue-500 flex items-center justify-center p-4">
            <div className="w-full max-w-[1280px] flex items-center justify-between">
                {!isSearchActive && !isCartActive && (
                    <div className="flex items-center justify-between w-full">

                        <div className="flex items-center gap-8">
                            <Link href="/">
                                <h3 className="text-white text-3xl font-bold">Eteration</h3>
                            </Link>
                            <div className="hidden sm:block">
                                <SearchInput />
                            </div>
                        </div>
                        <div className="flex items-center gap-4 text-white">
                            <div
                                className="flex items-center gap-2 cursor-pointer"
                                onClick={toggleCart}
                            >
                                <PortfeilIcon />
                                <p className="hidden sm:block">{totalPrice} ₺</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <ProfileIcon />
                                <p className="hidden sm:block">Veysel</p>
                            </div>
                            <button
                                className="block sm:hidden"
                                onClick={toggleSearch}
                                aria-label="Search"
                            >
                                <SearchIcon className="w-6 h-6 text-white" />
                            </button>
                        </div>
                    </div>
                )}
                {isSearchActive && (
                    <div className="w-full flex items-center">
                        <button
                            onClick={toggleSearch}
                            aria-label="Close Search"
                            className="text-white p-2"
                        >
                            <CloseIcon className="w-6 h-6 text-white" />
                        </button>
                        <div className="flex-grow">
                            <SearchInput />
                        </div>
                    </div>
                )}
                {isCartActive && (
                    <div className="w-full h-screen fixed inset-0 bg-white z-50 overflow-y-auto p-4">
                        <div className="flex justify-between items-center mb-4">
                            <button
                                onClick={toggleCart}
                                aria-label="Close Cart"
                                className="text-blue-500 p-2"
                            >
                                <CloseIcon className="w-6 h-6" />
                            </button>
                        </div>
                        <Cart />
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
