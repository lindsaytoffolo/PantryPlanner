"use client";

import { Button } from "@/app/ui/button";
import React, { useState, useRef } from "react";
import { twMerge } from "tailwind-merge";

interface ImageUploaderProps {
    setPreviewImage: React.Dispatch<React.SetStateAction<string | undefined>>;
    previewImage?: string;
    setImage: React.Dispatch<React.SetStateAction<File | null>>;
    errors?: string[];
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
    setPreviewImage,
    previewImage,
    setImage,
    errors,
}) => {
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragging(false);

        const file = event.dataTransfer.files[0];
        if (file && file.type.startsWith("image/")) {
            setPreviewImage(URL.createObjectURL(file));
            setImage(file);
        }
    };

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] as File;
        setPreviewImage((oldImage) => (file ? URL.createObjectURL(file) : oldImage));
        file && setImage(file);
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    return (
        <div className="h-full flex flex-col">
            <div
                className={twMerge(
                    "grow w-72 relative flex items-center justify-center border border-gray-300 hover:border-gray-500 focus:border-violet-900 shadow-custom-input rounded-lg",
                    isDragging ? "bg-gray-100" : "bg-white",
                    !previewImage && "border-dashed cursor-pointer"
                )}
                onClick={previewImage ? undefined : handleClick}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
            >
                {previewImage ? (
                    <div className="relative w-full h-full overflow-hidden">
                        <img
                            src={previewImage}
                            alt="Preview"
                            className="absolute inset-0 w-full h-full object-cover rounded-lg"
                        />
                        <Button
                            onClick={handleClick}
                            className="absolute bottom-2 right-2 bg-gray-100 text-black border-gray-300 border rounded-lg focus:outline-none active:bg-gray-300 hover:bg-gray-300"
                        >
                            Change image
                        </Button>
                    </div>
                ) : (
                    <div className="text-gray-400 p-4 text-center">
                        Drag and drop an image here, or click to select one
                    </div>
                )}
                <input
                    type="file"
                    name="image"
                    aria-describedby="image-error"
                    accept="image/*"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handleChange}
                />
            </div>
            <div id="image-error" aria-live="polite" aria-atomic="true">
                {errors &&
                    errors.map((error: string) => (
                        <p className="mt-2 text-sm text-red-500" key={error}>
                            {error}
                        </p>
                    ))}
            </div>
        </div>
    );
};

export default ImageUploader;
