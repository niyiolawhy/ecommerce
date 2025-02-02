"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { IoArrowBack } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";
import { IProduct } from "@/types/product";
import { useCart } from "@/contexts/cart-context";
import { fetchProductDetail } from "@/services/fetch-details";

function ProductDetail() {
    const { addToCart, isItemInCart, getItemFromCart,increaseQuantity,decreaseQuantity,removeFromCart } = useCart()
    const router = useRouter();
    const [product, setProduct] = useState<IProduct | null>(null);
    const [loading, setLoading] = useState(true);
    const params = useParams();
    const productId = params?.id || "";
    const qty = getItemFromCart(Number(productId))?.quantity || 0;

    useEffect(() => {
        fetchProductDetail(productId as string, setLoading, setProduct);
    }, [productId]);


    if (loading) {
        return <div className="flex italic items-center justify-center h-[calc(100vh-100px)]">Details will be up in a bit!</div>;
    }

    if (!product) {
        return <div className="flex italic items-center justify-center h-[calc(100vh-100px)]">Product not found!</div>;
    }

    return (

        <div className="container mx-auto min-h-screen dark:bg-gray-800 : bg-white lg:p-8 p-6 ">
            <div className="my-4 lg:px-0 px-3 lg:my-8">
                <button
                    className="p-3 bg-gray-200 dark:bg-gray-700 rounded-full shadow-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
                    onClick={() => router.back()}
                >
                    <IoArrowBack className="text-xl text-gray-800 dark:text-white" />
                </button>
            </div>
            <div className="flex flex-col justify-center  items-center container mx-auto  dark:bg-gray-800 : bg-white">

                <div className="bg-white dark:bg-gray-800  rounded-3xl w-full max-w-3xl shadow-emerald-100 transition-all duration-300">
                    <div className="flex items-center   justify-between mb-8">
                        <h1 className="text-xl font-bold text-gray-900 dark:text-white flex-1 text-center">
                            {product.title}
                        </h1>

                    </div>
                    <div className="w-full flex justify-center">
                        <img
                            src={product.image}
                            alt={product.title}
                            className="rounded-xl w-full max-h-96 object-contain hover:scale-105 transition-transform duration-300"
                        />
                    </div>
                    <p className="text-2xl font-semibold text-[#F59E0B] text-center mt-4">
                        ₦{product.price}
                    </p>
                    <p className="mt-4 text-gray-800 dark:text-gray-300 text-lg text-center leading-relaxed">
                        {product.description}
                    </p>

                    <div className="flex justify-center mt-6">
                        {
                            isItemInCart(product.id) ? (
                                <div className="flex items-center gap-4">
                                    <button onClick={()=>{
                                        qty === 1 ? removeFromCart(product?.id) : decreaseQuantity(product?.id)
                                    }}   className="bg-red-500 hover:bg-red-400 text-white py-2 px-4 rounded-md transition duration-200 ease-in-out transform hover:scale-105 flex items-center gap-1 text-base">
                                       -
                                    </button>
                                    <p className="text-xl font-semibold">{qty}</p>
                                    <button onClick={() => increaseQuantity(product?.id)} className="bg-blue-500 hover:bg-blue-400 text-white py-2 px-4 rounded-md transition duration-200 ease-in-out transform hover:scale-105 flex items-center gap-1 text-base">
                                      +
                                    </button>
                                </div>
                            ) : (
                                <button className="bg-[#F59E0B] hover:bg-[#D97706] text-white px-6 py-3 rounded-lg shadow-lg font-semibold flex items-center gap-2 transition-all"
                                    onClick={() => addToCart(product)}
                                >
                                    Add to Cart  <FaShoppingCart size={20} />
                                </button>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>

    );

}

export default ProductDetail;
