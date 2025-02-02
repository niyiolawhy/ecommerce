import React from "react";
import Link from "next/link";

interface ModalProps {
    showModal: boolean;
    setShowModal: (show: boolean) => void;
    buttonText: string;
    buttonLink: string;
}

const SuccessModal: React.FC<ModalProps> = ({
    showModal,
    setShowModal,
    buttonText,
    buttonLink,
}) => {
    if (!showModal) return null;

    return (
        <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
            aria-hidden={!showModal}
        >
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-sm md:max-w-md w-full shadow-lg">
                <div className="text-center">
                    <p
                        className="text-lg font-semibold text-gray-900 dark:text-white"
                        id="modal-title"
                    >
                        Thank you for ordering from us 🎉 <br />
                        Your order will get to you soon 🥳
                    </p>
                </div>
                <div className="mt-6 flex justify-center">
                    <Link href={buttonLink} className="w-full sm:w-auto">
                        <button
                            onClick={() => setShowModal(false)}
                            className="w-full sm:w-auto px-4 py-2 font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-md transition duration-300"
                        >
                            {buttonText}
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SuccessModal;
