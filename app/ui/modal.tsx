"use client";

import { XMarkIcon } from "@heroicons/react/24/outline";
import React, { ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";

export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    // prevent window movement while modal is open
    useEffect(() => {
        if (isOpen) document.body.style.overflow = "hidden";
        else document.body.style.overflow = "";

        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    const handleOverlayClick = (
        e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    ) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    if (!isOpen) return null;

    return createPortal(
        <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            onClick={handleOverlayClick}
        >
            <div
                className="relative mx-auto w-[500px] rounded-xl bg-white p-8 shadow-lg"
                role="document"
            >
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 text-gray-600 hover:text-gray-900"
                    aria-label="Close modal"
                >
                    <XMarkIcon className="w-6 stroke-2 text-neutral-500" />
                </button>
                {children}
            </div>
        </div>,
        document.body,
    );
};

export default Modal;
