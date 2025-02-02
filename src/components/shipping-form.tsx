"use client"
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import InputField from "./input-field";
import ConfirmationModal from "./modal";
import SuccessModal from "./success-modal";
import { useCart } from "@/contexts/cart-context";

interface ShippingDetails {
    name: string;
    address: string;
    phone: string;
    email: string;
}


const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    address: Yup.string().required("Address is required"),
    phone: Yup.string().required("Phone number is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
});

const ShippingForm = () => {
    const {clearCart} = useCart();
    const [showModal, setShowModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm<ShippingDetails>({
        resolver: yupResolver(validationSchema),
    });
    const onSubmit = (values: { name: string; address: string; phone: string; email: string }) => {
        console.log(values);
        setShowModal(true);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <InputField
                    label="Name"
                    {...register('name')}
                    error={errors.name?.message}
                />
            </div>
            <div>
                <InputField
                    label="Address"
                    {...register("address")}
                    error={errors.address?.message}
                />
            </div>

            <div>
                <InputField
                    label="Phone Number"
                    {...register("phone")}
                    error={errors.phone?.message} />
            </div>
            <div>
                <InputField
                    label="Email"
                    {...register("email")}
                    error={errors.email?.message} />
            </div>

            <button
                type="submit"
                className="w-full bg-[#F59E0B] hover:bg-[#D97706] text-white py-2 rounded-md  transition"
            >
                Submit Order
            </button>
            <ConfirmationModal
                showModal={showModal}
                onClose={() => {
                    setShowModal(false)
                }}

                title="Are you sure you want to checkout?"
                onConfirm={() => {
                    setShowModal(false)
                    setShowSuccessModal(true)
                    clearCart()
                }}
                 />

            <SuccessModal
                showModal={showSuccessModal}
                setShowModal={setShowSuccessModal}
                buttonText="Continue Shopping"
                buttonLink="/"

            />
        </form>
    );
};

export default ShippingForm;
