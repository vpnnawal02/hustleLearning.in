import React, { useState } from 'react';

const ImageUpload = ({ onUpload, onClose }) => {
    const [preview, setPreview] = useState(null);
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            // Validate file type
            if (!selectedFile.type.startsWith('image/')) {
                alert('Please select an image file');
                return;
            }

            // Validate file size (2MB)
            if (selectedFile.size > 2 * 1024 * 1024) {
                alert('File size must be less than 2MB');
                return;
            }

            setFile(selectedFile);

            // Create preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(selectedFile);
        }
    };

    const handleUpload = async () => {
        if (!file) return;

        setUploading(true);
        try {
            await onUpload(file);
        } catch (error) {
            console.error('Upload error:', error);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-gray-800 rounded-lg p-8 max-w-md w-full mx-4">
                <h2 className="text-2xl font-bold text-white mb-6">Upload Profile Picture</h2>

                {/* Preview */}
                {preview && (
                    <div className="mb-6 flex justify-center">
                        <img
                            src={preview}
                            alt="Preview"
                            className="w-48 h-48 rounded-full object-cover border-4 border-yellow-500"
                        />
                    </div>
                )}

                {/* File Input */}
                <div className="mb-6">
                    <label className="block w-full">
                        <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center cursor-pointer hover:border-yellow-500 transition-colors">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="hidden"
                            />
                            <p className="text-gray-400">Click to select image</p>
                            <p className="text-sm text-gray-500 mt-2">Max size: 2MB</p>
                        </div>
                    </label>
                </div>

                {/* Actions */}
                <div className="flex space-x-4">
                    <button
                        onClick={handleUpload}
                        disabled={!file || uploading}
                        className="flex-1 bg-yellow-500 text-gray-900 py-3 rounded-lg font-semibold hover:bg-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        {uploading ? 'Uploading...' : 'Upload'}
                    </button>
                    <button
                        onClick={onClose}
                        className="flex-1 bg-gray-700 text-white py-3 rounded-lg font-semibold hover:bg-gray-600 transition-colors"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ImageUpload;
