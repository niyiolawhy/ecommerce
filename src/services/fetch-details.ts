import { IProduct } from "@/types/product";

export const fetchProductDetail = async (productId:string,setLoading:(value:boolean)=>void,onSuccess:(data:IProduct)=>void) => {
  try {
    setLoading(true);
    const response = await fetch(
      `https://fakestoreapi.com/products/${productId}`
    );
    const data = await response.json();
    onSuccess(data);
  } catch (error) {
    console.error("Error fetching product:", error);
  } finally {
    setLoading(false);
  }
};
