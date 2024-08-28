"use client";

import { Button } from "@/app/ui/button";
import React, { useRef, useState } from "react";
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
        setPreviewImage((oldImage) =>
            file ? URL.createObjectURL(file) : oldImage,
        );
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
        <div className="flex h-full flex-col">
            <div
                className={twMerge(
                    "relative flex h-44 w-72 grow items-center justify-center rounded-lg border border-gray-300 shadow-custom-input hover:border-gray-500 focus:border-violet-900 md:h-auto",
                    isDragging ? "bg-gray-100" : "bg-white",
                    !previewImage && "cursor-pointer border-dashed",
                )}
                onClick={previewImage ? undefined : handleClick}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
            >
                {previewImage ? (
                    <div className="relative h-full w-full overflow-hidden">
                        <img
                            src={previewImage}
                            alt="Preview"
                            className="absolute inset-0 h-full w-full rounded-lg object-cover"
                        />
                        <Button
                            onClick={handleClick}
                            className="absolute bottom-2 right-2 rounded-lg border border-gray-300 bg-gray-100 text-black hover:bg-gray-300 focus:outline-none active:bg-gray-300"
                        >
                            Change image
                        </Button>
                    </div>
                ) : (
                    <div className="p-4 text-center text-gray-400">
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
