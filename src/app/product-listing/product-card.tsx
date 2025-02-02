import { IProduct } from '@/types/product';
import Link from 'next/link';
import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { useCart } from "@/contexts/cart-context";


function ProductCard({ product }: { product: IProduct}) {
    const { addToCart, isItemInCart,getItemFromCart,decreaseQuantity,increaseQuantity,removeFromCart } = useCart()
    const qty = getItemFromCart(product.id)?.quantity || 0;

    return (
        <div className="border rounded-lg p-4 bg-white dark:bg-gray-900 shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-105 flex flex-col justify-between relative">
            {
                isItemInCart(product.id) && (
                    <div className='absolute top-2 right-2 dark:bg-white dark:text-gray-900 text-white bg-gray-900 py-2 px-4 rounded-full shadow-lg'>
                        {qty}
                    </div>
                )
            }
            <div className="h-[250px] flex items-center justify-center">
                <img
                    src={product.image}
                    alt={product.title}
                    className="rounded-xl h-full w-full object-contain"
                />
            </div>
            <div className="flex flex-col justify-between h-[100px] px-4 mt-4">
                <div>
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 truncate">
                        {product.title}
                    </h2>
                    <p className="text-gray-500 dark:text-gray-300 truncate">₦{product.price}</p>
                </div>

                <div className="flex items-center gap-2">
                    <Link
                        className="bg-[#1E3A8A] dark:bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-[#1E40AF] dark:hover:bg-gray-700 transition w-[85%] text-center"
                        href={`/product/${product.id}`}
                    >
                        View Product
                    </Link>
                    {
                        isItemInCart(product.id) ? (
                            <div className="flex items-center gap-1">
                                <button
                                    onClick={() => {
                                        qty === 1 ? removeFromCart(product.id) : decreaseQuantity(product.id)
                                    }}
                                    className="bg-red-500 hover:bg-red-400 text-white py-2 px-4 rounded-md transition duration-200 ease-in-out transform hover:scale-105 flex items-center gap-1 text-base"
                                >
                                    -
                                </button>
                                <button
                                    onClick={() => increaseQuantity(product.id)}
                                    className="bg-blue-500 hover:bg-blue-400 text-white py-2 px-4 rounded-md transition duration-200 ease-in-out transform hover:scale-105 flex items-center gap-1 text-base"
                                >
                                    +
                                </button>
                            </div>
                        ) :
                            <button
                                onClick={() => addToCart(product)}
                                className="bg-[#F59E0B] hover:bg-[#D97706] text-white p-2 rounded-md transition duration-200 ease-in-out transform hover:scale-105 flex items-center gap-1"
                            >
                                <FaShoppingCart size={24} />
                            </button>
                    }

                </div>
            </div>
        </div>
    );
}

export default ProductCard;
