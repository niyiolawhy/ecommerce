"use client"
import { useState, useEffect } from "react";
import ProductCard from "./product-card";
import { IProduct } from "@/types/product";
import { fetchProducts } from "@/services/fetch-products";

const ProductCards = () => {
 
    const [products, setProducts] = useState<IProduct[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProducts((data:IProduct[])=>{
            setProducts(data)
            setLoading(false)
        });
    }, []);

    const handleChange=async(e: React.ChangeEvent<HTMLInputElement>)=>{
        const searchValue = e.target.value;
        const products = await fetchProducts()
        const filtered = products?.filter((product:IProduct) => (
            product.title.toLowerCase().includes(searchValue.toLowerCase())
        )) || [];
        setProducts(filtered);
    }


    if (loading) return <p className="items-center flex italic justify-center mt-5">Loading products...</p>;

    return (
        <div className="container mx-auto ">
            <div className="flex justify-between mt-0 md:flex-row  flex-col lg:flex-row items-center lg:mt-4">
                    <h1 className="lg:text-3xl text-2xl font-bold mb-4">Explore Our Products</h1>
                <div className="flex items-center mb-2 border-2 px-2 rounded-lg bg-white w-full max-w-md">
                    <input
                        type="text"
                        placeholder="Search products..."
                        onChange={handleChange} 
                        className="flex-1 focus:outline-none text-black text-sm sm:text-base bg-transparent p-2"
                    />
                   
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6  mt-4">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default ProductCards;
