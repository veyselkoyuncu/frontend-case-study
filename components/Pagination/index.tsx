import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    setCurrentPage,
    applyFilters,
    selectCurrentPage,
    selectTotalPages,
} from "@/store/productSlice";

const Pagination = () => {
    const dispatch = useDispatch();
    const currentPage = useSelector(selectCurrentPage);
    const totalPages = useSelector(selectTotalPages);

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            dispatch(setCurrentPage(page));
            dispatch(applyFilters());
        }
    };

    const renderPageNumbers = () => {
        const pages = [];
        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(
                    <button
                        key={i}
                        onClick={() => handlePageChange(i)}
                        className={`px-3 py-1 rounded ${
                            currentPage === i
                                ? "text-blue-500 bg-white shadow-md"
                                : "bg-transparent text-gray-500 hover:text-blue-500"
                        }`}
                    >
                        {i}
                    </button>
                );
            }
        } else {
            pages.push(
                <button
                    key={1}
                    onClick={() => handlePageChange(1)}
                    className={`px-3 py-1 rounded ${
                        currentPage === 1
                            ? "text-blue-500 bg-white shadow-md"
                            : "bg-transparent text-gray-500 hover:text-blue-500"
                    }`}
                >
                    1
                </button>
            );
            if (currentPage > 3) {
                pages.push(<span key="left-dots" className="px-3 text-gray-400">...</span>);
            }

            const startPage = Math.max(2, currentPage - 1);
            const endPage = Math.min(totalPages - 1, currentPage + 1);

            for (let i = startPage; i <= endPage; i++) {
                pages.push(
                    <button
                        key={i}
                        onClick={() => handlePageChange(i)}
                        className={`px-3 py-1 rounded ${
                            currentPage === i
                                ? "text-blue-500 bg-white shadow-md"
                                : "bg-transparent text-gray-500 hover:text-blue-500"
                        }`}
                    >
                        {i}
                    </button>
                );
            }
            if (currentPage < totalPages - 2) {
                pages.push(<span key="right-dots" className="px-3 text-gray-400">...</span>);
            }

            pages.push(
                <button
                    key={totalPages}
                    onClick={() => handlePageChange(totalPages)}
                    className={`px-3 py-1 rounded ${
                        currentPage === totalPages
                            ? "text-blue-500 bg-white shadow-md"
                            : "bg-transparent text-gray-500 hover:text-blue-500"
                    }`}
                >
                    {totalPages}
                </button>
            );
        }

        return pages;
    };

    if (totalPages <= 1) return null;

    return (
        <div className="flex items-center justify-center space-x-2 mt-6">
            <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded ${
                    currentPage === 1
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-gray-500 hover:text-blue-500"
                }`}
            >
                &lt;
            </button>
            {renderPageNumbers()}
            <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 rounded ${
                    currentPage === totalPages
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-gray-500 hover:text-blue-500"
                }`}
            >
                &gt;
            </button>
        </div>
    );
};

export default Pagination;
