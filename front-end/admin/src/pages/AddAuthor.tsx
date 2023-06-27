import { useState } from "react";

const AddAuthor: React.FC = () => {
    const [name, setName] = useState<String>("");
    const [image, newImage] = useState<File>();

    function handleNameChange() {

    }

    function handleSubmit() {

    }

    function handleImageChange() {

    }

    return (
        <div className="px-4 py-6">
            <h2 className="text-2xl font-semibold mb-4">Add New Author</h2>
            <form onSubmit={handleSubmit} className="max-w-md">
                <div className="mb-4">
                    <label htmlFor="name" className="block font-medium mb-1">
                        Name:
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={name as string}
                        onChange={handleNameChange}
                        className="border border-gray-300 rounded px-3 py-2 w-full"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="img" className="block font-medium mb-1">
                        Image:
                    </label>
                    <form action='/images' method='post' encType="multipart/form-data">
                        <input type="file" name="image" onChange={handleImageChange} />
                    </form>
                </div>
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
                    Add author
                </button>
            </form>
        </div>
    );
}

export default AddAuthor;