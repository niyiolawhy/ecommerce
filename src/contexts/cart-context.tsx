"use client"
import { IProduct,CartItem } from "@/types/product";
import { createContext, useContext, useState,  ReactNode, useEffect, useRef } from "react";

interface CartContextType {
    cart: CartItem[];
    addToCart: (product: IProduct) => void;
    removeFromCart: (id: number) => void;
    increaseQuantity: (id: number) => void;
    decreaseQuantity: (id: number) => void;
    totalPrice: number;
    clearCart:()=>void;
    isItemInCart: (id: number) => boolean;
    getItemFromCart: (id: number) => CartItem | undefined;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
    children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
    const [cart, setCart] = useState<CartItem[]>([]);
    const initialRender = useRef(true);
 
    const addToCart = (product: IProduct) => {
        setCart((prevCart) => {
            //validate that the item is not already added to the cart
            const existingItem = prevCart.find((item) => item.id === product.id);
            if (existingItem) {
                return prevCart.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prevCart, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (id: number) => {
        setCart(cart.filter((item) => item.id !== id));
    };

    const increaseQuantity = (id: number) => {
        setCart(cart.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        ));
    };

    const decreaseQuantity = (id: number) => {
        setCart(cart.map((item) =>
            item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
        ));
    };

    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    const clearCart =()=>{
        setCart([])
    }

    const isItemInCart = (id: number) => cart.some((item) => item.id === id);

    const getItemFromCart = (id: number) => cart.find((item) => item.id === id);

    useEffect(() => {
        if(typeof window === "undefined") return;
        const cart = localStorage.getItem("cart");
        if (cart) {
            setCart(JSON.parse(cart));
        }
    }, []);
    
    useEffect(() => {
        if (initialRender.current) {
            initialRender.current = false;
            return;
        }
        if(typeof window === "undefined") return;
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, totalPrice,clearCart,isItemInCart,getItemFromCart }}>
            {children}
        </CartContext.Provider>
    );
};
export const useCart = (): CartContextType => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};




 