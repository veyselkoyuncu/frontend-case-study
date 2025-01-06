import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/interfaces/product';


const mockProduct: Product = {
    createdAt: "2023-07-17T07:21:02.529Z",
    name: "Bentley Focus",
    image: "https://loremflickr.com/640/480/food",
    price: 51.0,
    description: "Quasi adipisci sint veniam delectus...",
    model: "CTS",
    brand: "Lamborghini",
    id: "1",
};


const mockOnAddToCart = jest.fn();

describe('ProductCard', () => {
    it('renders product details correctly', () => {
        render(<ProductCard product={mockProduct} onAddToCart={mockOnAddToCart} />);

        expect(screen.getByText(mockProduct.name)).toBeInTheDocument();
        expect(screen.getByText(`${mockProduct.price} ₺`)).toBeInTheDocument();
        expect(screen.getByAltText(mockProduct.name)).toBeInTheDocument();
    });

    it('calls onAddToCart when the button is clicked', () => {
        render(<ProductCard product={mockProduct} onAddToCart={mockOnAddToCart} />);


        fireEvent.click(screen.getByText('Add to Cart'));

        expect(mockOnAddToCart).toHaveBeenCalledTimes(1);
        expect(mockOnAddToCart).toHaveBeenCalledWith(mockProduct);
    });
});
