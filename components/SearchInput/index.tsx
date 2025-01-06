import React from 'react';
import { useDispatch } from 'react-redux';
import { setSearch, applyFilters } from '@/store/productSlice';
import SearchIcon from '@/public/search-icon.svg'

const SearchInput = () => {
    const dispatch = useDispatch();

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearch(e.target.value));
        dispatch(applyFilters());
    };

    return (
        <div className="relative w-full md:w-[450px]">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <SearchIcon className="h-5 w-5 text-gray-400"/>
            </div>
            <input
                type="text"
                placeholder="Search"
                className="border  pl-10 pr-2 py-2 w-full"
                onChange={handleSearch}
            />
        </div>
    );
};

export default SearchInput;
