import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addNewAuthor } from "../lib/axios/authors";

const AddAuthor: React.FC = () => {
    const token = localStorage.getItem('access_token') ? localStorage.getItem('access_token') : "";
    const navigate = useNavigate();
    const [name, setName] = useState<string>("");
    const [errors, setErrors] = useState<string>("");
    const [isAuthorCreated,setIsAuthorCreated] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (name === "") {
                throw new Error("Author name can not be Empty");
            }
            addNewAuthor(token ? token : "", name);
            setIsAuthorCreated(true);
        } catch (error: any) {
            setErrors(error.message)
        }
    }

    function createSuccess (){
        setIsAuthorCreated(false);
        navigate("/edit-author")
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
                        id="name"
                        name="name"
                        value={name as string}
                        onChange={(e) => { setName(e.target.value) }}
                        className="border border-gray-300 rounded px-3 py-2 w-full"
                    />
                </div>
                {errors && (
                    <div className="text-red-500 mb-4">{errors}</div>
                )}
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
                    Add author
                </button>
                {isAuthorCreated && (
                    <div className="fixed inset-0 flex items-center justify-center">
                        <div className="bg-white p-6 rounded-lg">
                            <p>Book created</p>
                            <button
                                onClick={createSuccess}
                                className="bg-blue-500 text-white py-2 px-4 rounded mt-4"
                            >
                                Ok
                            </button>
                        </div>
                    </div>
                )}
            </form>
        </div>
    );
}

export default AddAuthor;