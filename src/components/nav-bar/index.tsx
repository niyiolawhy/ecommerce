"use client"
import { useTheme } from "../../contexts/theme-context";
import { useCart } from "../../contexts/cart-context";
import { FaShoppingCart, FaSun, FaMoon } from "react-icons/fa";
import Link from "next/link";

const Navbar = () => {
    const { theme, toggleTheme } = useTheme();
    const { cart } = useCart();

    return (
        <nav className="bg-white  border-b dark:border-gray-700 dark:bg-gray-900 z-[99] sticky top-0">
            <div className="container mx-auto py-4 text-black dark:text-white flex justify-between items-center lg:px-6 md:px-8 px-8 ">
                <Link href="/">
                    <h1 className="text-xl font-bold cursor-pointer">SHOP.CO</h1>
                </Link>
                <div className="flex items-center gap-4 md:gap-6">
                    <button onClick={toggleTheme} className="p-2 rounded-full bg-gray-200 dark:bg-gray-700">
                        {theme === "light" ? <FaMoon size={20} /> : <FaSun size={20} />}
                    </button>
                    <Link href="/cart">
                    <div className="relative cursor-pointer">
                        <FaShoppingCart size={24} />
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                            {cart.length}
                        </span>
                    </div>
                    </Link>
                </div>
            </div>

            
        </nav>
    );
};

export default Navbar;
