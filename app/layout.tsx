'use client'

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import React from "react";
import Footer from "@/components/Footer";
import {Provider} from "react-redux";
import store from "@/store/store";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});


export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {


    return (
        <html lang="en">
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
            <Provider store={store}>
                <Header/>
                    <main>
                        {children}
                    </main>
                <Footer/>
            </Provider>
        </body>
        </html>
    );
}
