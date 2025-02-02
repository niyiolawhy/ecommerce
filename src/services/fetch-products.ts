import { IProduct } from "@/types/product";

 export  const fetchProducts = async (onSuccess?:(data:IProduct[])=>void, setLoading?: (loading: boolean) => void) => {
        try {
            const response = await fetch("https://fakestoreapi.com/products");
            const data:IProduct[] = await response.json();
           onSuccess?.(data)
            return data;
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setLoading?.(false);
        }
    };