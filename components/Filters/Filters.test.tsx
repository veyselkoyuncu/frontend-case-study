import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Filters from "@/components/Filters";
import { Provider } from "react-redux";
import store  from "@/store/store";

describe("Filters Component", () => {
    it("renders filter sections correctly", () => {
        render(
            <Provider store={store}>
                <Filters />
            </Provider>
        );


        expect(screen.getByText("Sort By")).toBeInTheDocument();

        expect(screen.getByText("Brands")).toBeInTheDocument();


        expect(screen.getByText("Models")).toBeInTheDocument();
    });

    it("opens and closes filter modal in mobile view", () => {
        render(
            <Provider store={store}>
                <Filters />
            </Provider>
        );


        const filterButton = screen.getByText("Filters");
        fireEvent.click(filterButton);


        expect(screen.getByText("Filters")).toBeInTheDocument();

        const closeButton = screen.getByText("Close");
        fireEvent.click(closeButton);


        expect(screen.queryByText("Filters")).not.toBeInTheDocument();
    });
});
