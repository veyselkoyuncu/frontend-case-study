
# Fronted Case Study

This project is a React-based e-commerce application developed using **Next.js**. It includes features such as product listing, filtering, cart management, and unit testing. Below is an overview of the project structure, setup, and usage.

---

## Table of Contents

1. [Technologies Used](#technologies-used)
2. [Project Structure](#project-structure)
3. [Setup Instructions](#setup-instructions)
4. [Scripts](#scripts)
5. [Features](#features)
6. [API Details](#api-details)
7. [Testing](#testing)
8. [Figma Design](#figma-design)

---

## Technologies Used

- **Next.js**: v15.1.3
- **React**: v18.3.1
- **Redux Toolkit**: v2.5.0
- **Tailwind CSS**: v3.4.1
- **TypeScript**: v5.0
- **Jest**: v29.7.0 (for unit testing)
- **@testing-library/react**: v16.1.0 (for component testing)

---

## Project Structure

```
fronted-case-study/
├── components/        # Reusable UI components
├── interfaces/        # TypeScript interfaces
├── pages/             # Next.js pages
├── store/             # Redux store setup and slices
├── styles/            # Global styles
├── tests/             # Unit and integration tests
├── public/            # Static assets (e.g., images, icons)
├── tsconfig.json      # TypeScript configuration
├── jest.config.js     # Jest configuration
├── package.json       # Project dependencies and scripts
└── README.md          # Project documentation
```

---

## Setup Instructions

### Prerequisites

Ensure you have the following installed:
- Node.js (v16 or higher)
- npm (v7 or higher)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```bash
   cd fronted-case-study
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

---

## Scripts

Here are the available npm scripts:

| Script         | Description                                 |
|----------------|---------------------------------------------|
| `npm run dev`  | Starts the development server               |
| `npm run build`| Builds the application for production       |
| `npm run start`| Runs the production build                   |
| `npm run lint` | Lints the code using ESLint                 |
| `npm run test` | Runs the unit tests with Jest               |

---

## Features

1. **Product Listing**:
   - Displays products fetched from the API.
   - Responsive design using Tailwind CSS.

2. **Filtering**:
   - Filter products by brand, model, and sorting options (e.g., price low to high).

3. **Cart Management**:
   - Add, update, and remove items from the cart.
   - Persist cart state in `localStorage`.

4. **Pagination**:
   - Supports pagination for product listing.

5. **Unit Testing**:
   - Components and Redux slices are tested using Jest and Testing Library.

---

## API Details

The project fetches product data from the following API:

### Base URL:
```
https://5fc9346b2af77700165ae514.mockapi.io/products
```

### Sample Product Data:
```json
{
  "id": "1",
  "name": "Sample Product",
  "price": 100,
  "image": "https://loremflickr.com/640/480/food",
  "description": "Product description here.",
  "model": "Model A",
  "brand": "Brand X",
  "createdAt": "2023-01-01T12:00:00Z"
}
```

---

## Testing

The project uses **Jest** and **Testing Library** for unit testing.

### Running Tests

To run the tests:
```bash
npm run test
```

### Example Tests

#### Cart Slice Test
The `cartSlice` reducer is tested for actions like adding, updating, and removing items from the cart.

#### Product Slice Test
The `productSlice` reducer is tested for filtering, sorting, and pagination functionality.

#### Component Tests
Components like `Cart`, `SearchInput`, and `Filters` are tested for proper rendering and functionality.

---

## Figma Design

The UI design is based on the Figma prototype available [here](https://www.figma.com/file/V4VefkJBn8SESKJwJO3486/Eteration-React-Case-Study).

---

## Notes

- Ensure `localStorage` is enabled in your browser to persist cart state.
- Tailwind CSS is used for styling; refer to the [Tailwind Documentation](https://tailwindcss.com/docs) for customizations.
- The project is set up for scalability with a modular structure for components and Redux slices.
