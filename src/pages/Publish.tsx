import React, { useState } from 'react';
import { AppBar } from "../components/Appbar"
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { ChangeEvent } from "react";

export const Publish = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState<File | null>(null); // State to hold the selected image file
    const navigate = useNavigate();

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file);
        }
    };

    const handlePublish = async () => {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', description);
        if (image) {
            formData.append('image', image);
        }

        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/blog`, formData, {
                headers: {
                    Authorization: localStorage.getItem("token"),
                    'Content-Type': 'multipart/form-data', // Ensure proper form data headers
                }
            });
            navigate(`/blog/${response.data.id}`);
        } catch (error) {
            console.error('Error publishing post:', error);
            // Handle error
        }
    };

    return (
        <div>
            <AppBar />
            <div className="flex justify-center w-full pt-8">
                <div className="max-w-screen-lg w-full">
                    <input
                        onChange={(e) => setTitle(e.target.value)}
                        type="text"
                        className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Title"
                    />

                    {/* Image upload input */}
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="w-full mt-4"
                    />

                    <TextEditor onChange={(e) => setDescription(e.target.value)} />

                    <button
                        onClick={handlePublish}
                        type="submit"
                        className="mt-4 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
                    >
                        Publish post
                    </button>
                </div>
            </div>
        </div>
    );
}

function TextEditor({ onChange }: { onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void }) {
    return (
        <div className="mt-2">
            <div className="w-full mb-4">
                <div className="flex items-center justify-between border">
                    <div className="my-2 bg-white rounded-b-lg w-full">
                        <label className="sr-only">Publish post</label>
                        <textarea
                            onChange={onChange}
                            id="editor"
                            rows={8}
                            className="focus:outline-none block w-full px-0 text-sm text-gray-800 bg-white border-0 pl-2"
                            placeholder="Write an article..."
                            required
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
