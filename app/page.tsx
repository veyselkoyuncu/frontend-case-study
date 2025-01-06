import ProductListContainer from "@/Container/ProductListContainer";
import CartContainer from "@/Container/CartContainer";
import FiltersContainer from "@/Container/FiltersContainer";

export default function Home() {
    return (
        <div className="w-full max-w-[1440px] mx-auto p-4">
            <div className="lg:hidden mb-4">
                <FiltersContainer />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_4fr_1fr] gap-4">
                <div className="hidden lg:block">
                    <FiltersContainer />
                </div>
                <ProductListContainer />
                <div className="hidden lg:block">
                    <CartContainer />
                </div>
            </div>
        </div>
    );
}
