import React from "react";

interface DrawerProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

export default function Drawer({ isOpen, onClose, children }: DrawerProps) {
    return (
        <div
            className={`fixed inset-0 z-50 transition-opacity duration-300 ${
                isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
        >

            <div
                className="fixed inset-0 bg-black bg-opacity-50"
                onClick={onClose}
            ></div>

            <div
                className={`fixed right-0 top-0 h-full md:w-96 w-[70%] bg-white shadow-lg transform transition-transform duration-300 ${
                    isOpen ? "translate-x-0" : "translate-x-full"
                }`}
            >
                <div className="p-6">
                    <div className="mt-4">
                        {children}  
                    </div>
                </div>
            </div>
        </div>
    );
}