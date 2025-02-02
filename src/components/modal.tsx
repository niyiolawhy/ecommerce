import React from "react";

interface ModalProps {
    showModal: boolean;
    onClose: () => void;
    title: string;
   onConfirm: () => void;
}

const ConfirmationModal: React.FC<ModalProps> = ({
    showModal,
    onClose,
    title,
    onConfirm
}) => {
    if (!showModal) return null;

    return (
        <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
            aria-hidden={!showModal}
        >
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-sm md:max-w-md w-full shadow-lg">
                <div className="text-center">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white" id="modal-title">
                        {title}
                    </h3>
                </div>
                <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button
                            onClick={onConfirm}
                            className="w-full sm:w-auto px-4 py-2 font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-md transition duration-300"
                        >
                            Yes
                        </button>
                        <button
                            className="w-full sm:w-auto px-4 py-2 font-semibold bg-gray-600 hover:bg-gray-700 text-white rounded-md transition duration-300"
                        onClick={onClose}
                        >
                            No
                        </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
