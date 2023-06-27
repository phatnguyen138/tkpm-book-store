import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { AuthUser, ProfileUpdateInfo } from "../types/User";
import { getUserInfo, updateUserProfile } from "../lib/axios/user";

const ProfileEdit = () => {
    const navigate = useNavigate();
    const [showPopup, setShowPopup] = useState(false);
    const [popupVisible, setPopupVisible] = useState(false);
    const token = localStorage.getItem('access_token') ? localStorage.getItem('access_token') : "";
    const [authUser, setAuthUser] = useState<AuthUser>();
    const [profileUpdateInfo, setProfileUpdateInfo] = useState<ProfileUpdateInfo>({
        fullname: "",
        email: "",
        avatar: null,
        address: "",
        phone: ""
    });

    const fetchProduct = async () => {
        try {
            const response = await getUserInfo(token as string);
            setAuthUser(response.data);
            const userInfo: ProfileUpdateInfo = ({
                fullname: response.data?.fullname as string,
                email: response.data?.email as string,
                avatar: null,
                address: response.data?.address as string,
                phone: response.data?.phone as string
            })

            setProfileUpdateInfo(userInfo);
        } catch (error) {
            console.log("Error loading item detail");
        }
    };


    useEffect(() => {
        if (popupVisible) {
            // Navigate to the profile page
            navigate('/profile');
        }
    }, [popupVisible]);

    useEffect(() => {
        fetchProduct();
    }, []);

    // Handle form change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProfileUpdateInfo((prevProduct) => ({
            ...prevProduct,
            [name]: value,
        }));
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const updatedInfo: ProfileUpdateInfo = {
            ...profileUpdateInfo,
            fullname: e.target.value
        };
        setProfileUpdateInfo(updatedInfo);
    };

    const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProfileUpdateInfo((prevProduct) => ({
            ...prevProduct,
            "address": value,
        }));
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProfileUpdateInfo((prevProduct) => ({
            ...prevProduct,
            "email": value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission, e.g., send data to the server
        console.log(profileUpdateInfo);
        console.log(authUser?.user_id);
        updateUserProfile(token as string, authUser?.user_id as string, profileUpdateInfo.fullname, profileUpdateInfo.email, profileUpdateInfo.avatar as File, profileUpdateInfo.address, profileUpdateInfo.phone)
        setShowPopup(true);
    };

    function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
        const files = e.target.files;
        if (files !== null && files.length > 0) {
            const file = files[0];
            setProfileUpdateInfo((prevProduct) => ({
                ...prevProduct,
                "avatar": file,
            }));
        }
    }

    return (
        <div className="px-3 py-3 flex flex-col items-center justify-center mb-8">
            {showPopup && (
            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-4 rounded">
                    <p className="text-center">Profile changed!</p>
                    <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded" onClick={() => setPopupVisible(true)}>OK</button>
                </div>
            </div>
            )}
            <h2 className="text-2xl font-semibold mb-4">Update profile</h2>
            <form onSubmit={handleSubmit} className="max-w-md">
                <div className="mb-4">
                    <label htmlFor="name" className="block font-medium mb-1">
                        Name:
                    </label>
                    <input
                        type="text"
                        id="fullname"
                        name="fullname"
                        value={profileUpdateInfo?.fullname}
                        onChange={handleNameChange}
                        className="border border-gray-300 rounded px-3 py-2 w-full"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="name" className="block font-medium mb-1">
                        Email:
                    </label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        value={profileUpdateInfo?.email}
                        onChange={handleEmailChange}
                        className="border border-gray-300 rounded px-3 py-2 w-full"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="img" className="block font-medium mb-1">
                        Avatar:
                    </label>
                    <form action='/images' method='post' encType="multipart/form-data">
                        <input type="file" name="image" onChange={handleImageChange} />
                    </form>
                </div>
                <div className="mb-4">
                    <label htmlFor="name" className="block font-medium mb-1">
                        Address:
                    </label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={profileUpdateInfo?.address}
                        onChange={handleAddressChange}
                        className="border border-gray-300 rounded px-3 py-2 w-full"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="name" className="block font-medium mb-1">
                        Phone:
                    </label>
                    <input
                        type="text"
                        id="phone"
                        name="phone"
                        value={profileUpdateInfo?.phone}
                        onChange={handleChange}
                        className="border border-gray-300 rounded px-3 py-2 w-full"
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
                    Cập nhật
                </button>
            </form>
        </div>
    )
}

export default ProfileEdit