"use client"
import React from "react";
import { useCart } from "@/contexts/cart-context";
import ShippingForm from "@/components/shipping-form";
import { IoArrowBack } from "react-icons/io5";
import { useRouter } from "next/navigation";

const CheckoutPage = () => {
    const { cart, totalPrice } = useCart();
    const router = useRouter();
    return (
        <div className="container mx-auto px-8 py-6">
            <div className="flex justify-between items-center mb-6">
                <div className="my-4 lg:px-0  lg:my-8">
                    <button
                        className="p-3 bg-gray-200 dark:bg-gray-700 rounded-full shadow-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
                        onClick={() => router.back()}
                    >
                        <IoArrowBack className="text-xl text-gray-800 dark:text-white" />
                    </button>
                </div>
                <h2 className="text-2xl font-semibold text-center ">Shipping Details</h2>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1">
                    {cart.length === 0 ? (
                        <p className="text-gray-500 text-center">Your cart is empty.</p>
                    ) : (
                        <div className="space-y-4">
                            {cart.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex justify-between items-center bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-md"
                                >
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-16 h-16 object-cover rounded-lg"
                                    />
                                    <div className="flex-1 ml-3">
                                        <p className="text-sm font-semibold text-gray-900 dark:text-white max-w-[90%] ">
                                            {item.title}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {cart.length > 0 && (
                        <div className="mt-6 text-center">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                Total: ₦{totalPrice.toLocaleString()}
                            </h3>
                        </div>
                    )}
                </div>
                <div className="flex-1">
                    <ShippingForm />
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
