import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import SearchInput from "@/components/SearchInput";

const mockStore = configureStore([]);

describe("SearchInput Component", () => {
    it("renders the search input and icon", () => {
        const store = mockStore({});
        render(
            <Provider store={store}>
                <SearchInput />
            </Provider>
        );

        expect(screen.getByPlaceholderText("Search")).toBeInTheDocument();

        const searchIcon = screen.getByRole("img", { hidden: true });
        expect(searchIcon).toBeInTheDocument();
    });

    it("dispatches setSearch and applyFilters on input change", () => {
        const store = mockStore({});
        store.dispatch = jest.fn();

        render(
            <Provider store={store}>
                <SearchInput />
            </Provider>
        );

        const searchInput = screen.getByPlaceholderText("Search") as HTMLInputElement;

        fireEvent.change(searchInput, { target: { value: "Test Search" } });

        expect(store.dispatch).toHaveBeenCalledWith({
            type: "products/setSearch",
            payload: "Test Search",
        });

        expect(store.dispatch).toHaveBeenCalledWith({
            type: "products/applyFilters",
        });
    });
});
