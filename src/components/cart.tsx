
"use client"
import { useCart } from "@/contexts/cart-context";
import Link from "next/link";
import { FaShoppingCart, FaTrash, FaPlus, FaMinus } from "react-icons/fa";
import { IoArrowBack } from "react-icons/io5";
import { useRouter } from "next/navigation";



const Cart = () => {
    const { cart, removeFromCart, increaseQuantity, decreaseQuantity, totalPrice } = useCart();
    const router = useRouter();
    return (
        <div className="container mx-auto  px-2">
            <div className="lg:p-6 md:p-6 p-3 bg-white dark:bg-gray-900  rounded-lg shadow-sm md:w-[90%] w-[100%] lg:w-[70%]  xl:w-[50%] mx-auto">

                <div className="flex justify-between items-center mb-6">
                    <div className="my-4  ">
                        <button
                            className="p-3 bg-gray-200 dark:bg-gray-700 rounded-full shadow-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
                            onClick={() => router.back()}
                        >
                            <IoArrowBack className="text-xl text-gray-800 dark:text-white" />
                        </button>
                    </div>
                    <h2 className="text-2xl mt-2 font-semibold flex items-center gap-2 text-gray-900 dark:text-white ">
                        <FaShoppingCart className="text-[#F59E0B]" /> Your Cart
                    </h2>
                </div>

                {cart.length === 0 ? (
                    <p className="text-gray-500 text-center mt-12 pb-12">Your cart is empty.</p>
                ) : (
                    <div className="mt-6 space-y-4">
                        {cart.map((item) => (
                            <div key={item.id} className="flex flex-row justify-between items-center bg-gray-100 dark:bg-gray-800 p=2 md:p-4 rounded-lg shadow-md">
                                <img src={item.image} alt={item.title} className="w-16 h-16 object-cover rounded-lg" />
                                <div className="flex-1 items-center ml-3 mt-4 md:mt-0 lg:mt-0 ">
                                    <p className=" md:text-sm text-xs font-semibold text-gray-900 dark:text-white max-w-[70%] ">{item.title}</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">₦{item.price.toLocaleString()}</p>
                                </div>
                                <div className="flex  lg:mt-0 md:mt-0 mt-3 items-center gap-2">
                                    <button
                                        onClick={() => decreaseQuantity(item.id)}
                                        className="p-2 bg-gray-300 dark:bg-gray-700 rounded-full hover:bg-gray-400 dark:hover:bg-gray-600 transition-all"
                                    >
                                        <FaMinus className="text-gray-800 dark:text-white" />
                                    </button>
                                    <span className="text-lg font-semibold text-gray-900 dark:text-white">{item.quantity}</span>
                                    <button
                                        onClick={() => increaseQuantity(item.id)}
                                        className="p-2 bg-gray-300 dark:bg-gray-700 rounded-full hover:bg-gray-400 dark:hover:bg-gray-600 transition-all"
                                    >
                                        <FaPlus className="text-gray-800 dark:text-white" />
                                    </button>
                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="p-2 text-red-500 hover:text-red-700 transition-all text-lg"
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                {cart.length > 0 && (
                    <div className="mt-6 text-center">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Total: ₦{totalPrice.toLocaleString()}</h3>
                        <Link href={"/checkout"}>

                            <button
                                className="mt-4 w-full bg-[#F59E0B] hover:bg-[#D97706] text-white px-6 py-3 rounded-lg shadow-lg font-semibold transition-all">
                                Proceed to Checkout
                            </button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;
