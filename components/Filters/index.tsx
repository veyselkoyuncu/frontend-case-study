import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    setBrandFilter,
    setModelFilter,
    setSort,
    applyFilters,
    selectBrands,
    selectModels,
} from "@/store/productSlice";
import { RootState } from "@/store/store";
import { FunnelIcon, XMarkIcon } from "@heroicons/react/24/outline";
import FilterSection from "@/components/FiltersSection";

const Filters = () => {
    const dispatch = useDispatch();
    const brands = useSelector(selectBrands);
    const models = useSelector(selectModels);
    const selectedBrands = useSelector((state: RootState) => state.products.filters.brand);
    const selectedModels = useSelector((state: RootState) => state.products.filters.model);

    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [brandSearch, setBrandSearch] = useState("");
    const [modelSearch, setModelSearch] = useState("");

    const [localSort, setLocalSort] = useState<string>("");

    const toggleFilter = () => {
        setIsFilterOpen((prev) => !prev);
    };

    const handleSortChange = (value: string) => {
        if (["oldToNew", "newToOld", "priceLowToHigh", "priceHighToLow"].includes(value)) {
            setLocalSort(value);
            dispatch(setSort(value as "oldToNew" | "newToOld" | "priceLowToHigh" | "priceHighToLow"));
            dispatch(applyFilters());
        }
    };

    const handleBrandChange = (value: string, isChecked: boolean) => {
        const updatedBrands = isChecked
            ? [...selectedBrands, value]
            : selectedBrands.filter((brand) => brand !== value);

        dispatch(setBrandFilter(updatedBrands));
        dispatch(applyFilters());
    };

    const handleModelChange = (value: string, isChecked: boolean) => {
        const updatedModels = isChecked
            ? [...selectedModels, value]
            : selectedModels.filter((model) => model !== value);

        dispatch(setModelFilter(updatedModels));
        dispatch(applyFilters());
    };

    const clearFilters = () => {
        setLocalSort("");
        dispatch(setBrandFilter([]));
        dispatch(setModelFilter([]));
        dispatch(applyFilters());
    };

    return (
        <>
            <div className="lg:hidden">
                <button
                    className="flex items-center gap-2 bg-blue-400 text-white px-4 py-2 hover:bg-blue-600 transition-all duration-200 rounded-3xl text-xs "
                    onClick={toggleFilter}
                >
                    <FunnelIcon className="w-5 h-5" />
                    <span>Filters</span>
                </button>

                {isFilterOpen && (
                    <div className="fixed inset-0 bg-white p-6 z-50 overflow-y-auto">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold">Filters</h2>
                            <button
                                className="font-bold flex items-center gap-1"
                                onClick={toggleFilter}
                            >
                                <XMarkIcon className="w-5 h-5" />
                                <span>Close</span>
                            </button>
                        </div>
                        <FilterSection
                            title="Sort By"
                            options={[
                                { value: "oldToNew", label: "Old to new" },
                                { value: "newToOld", label: "New to old" },
                                { value: "priceLowToHigh", label: "Price low to high" },
                                { value: "priceHighToLow", label: "Price high to low" },
                            ]}
                            selectedOptions={[localSort]}
                            onChange={(value) => handleSortChange(value)}
                            isCheckbox={false}
                        />
                        <FilterSection
                            title="Brands"
                            options={brands.filter((brand) =>
                                brand.toLowerCase().includes(brandSearch.toLowerCase())
                            )}
                            selectedOptions={selectedBrands}
                            onChange={(value, isChecked) => {
                                if (typeof isChecked !== "undefined") {
                                    handleBrandChange(value, isChecked);
                                }
                            }}
                            searchValue={brandSearch}
                            onSearchChange={setBrandSearch}
                            placeholder="Search Brands"
                        />
                        <FilterSection
                            title="Models"
                            options={models.filter((model) =>
                                model.toLowerCase().includes(modelSearch.toLowerCase())
                            )}
                            selectedOptions={selectedModels}
                            onChange={(value, isChecked) => {
                                if (typeof isChecked !== "undefined") {
                                    handleModelChange(value, isChecked);
                                }
                            }}
                            searchValue={modelSearch}
                            onSearchChange={setModelSearch}
                            placeholder="Search Models"
                        />

                        <button
                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 w-full mt-6"
                            onClick={clearFilters}
                        >
                            Clear Filters
                        </button>
                    </div>
                )}
            </div>

            <div className="hidden lg:block space-y-6">
                <FilterSection
                    title="Sort By"
                    options={[
                        { value: "oldToNew", label: "Old to new" },
                        { value: "newToOld", label: "New to old" },
                        { value: "priceLowToHigh", label: "Price low to high" },
                        { value: "priceHighToLow", label: "Price high to low" },
                    ]}
                    selectedOptions={[localSort]}
                    onChange={(value) => handleSortChange(value)}
                    isCheckbox={false}
                />
                <FilterSection
                    title="Brands"
                    options={brands.filter((brand) =>
                        brand.toLowerCase().includes(brandSearch.toLowerCase())
                    )}
                    selectedOptions={selectedBrands}
                    onChange={(value, isChecked) => {
                        if (typeof isChecked !== "undefined") {
                            handleBrandChange(value, isChecked);
                        }
                    }}
                    searchValue={brandSearch}
                    onSearchChange={setBrandSearch}
                    placeholder="Search Brands"
                />
                <FilterSection
                    title="Models"
                    options={models.filter((model) =>
                        model.toLowerCase().includes(modelSearch.toLowerCase())
                    )}
                    selectedOptions={selectedModels}
                    onChange={(value, isChecked) => {
                        if (typeof isChecked !== "undefined") {
                            handleModelChange(value, isChecked);
                        }
                    }}
                    searchValue={modelSearch}
                    onSearchChange={setModelSearch}
                    placeholder="Search Models"
                />
            </div>
        </>
    );
};

export default Filters;
