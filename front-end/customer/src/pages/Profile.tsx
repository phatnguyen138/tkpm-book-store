
import { useEffect, useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { AuthUser } from "../types/User";
import { getUserInfo } from "../lib/axios/user";
import ProfilePic from '../assets/avatar_alt.png'

const Profile = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('access_token') ? localStorage.getItem('access_token') : "";
  const [authUser, setAuthuser] = useState<AuthUser>();

  const fetchProduct = async () => {
    try {
      const response = await getUserInfo(token as string);
      console.log(response.data)
      setAuthuser(response.data);
    } catch (error) {
      console.log("Error loading item detail");
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <div>
      <div className="px-3 py-3 flex flex-col items-center justify-center mb-8">
        <h4 className="font-semibold text-lg text-sky-600 my-1 mx-auto w-fit">Thông tin tài khoản</h4>
        <div className="flex items-center gap-3">
          <div className="w-[120px] h-[120px] rounded-full border border-gray-300 overflow-hidden">
            <img
              className="object-cover w-full h-full"
              src={authUser?.avatar || ProfilePic}
              alt="User Avatar"
            />

          </div>
          <div className="flex flex-col">
            <p className="text-lg font-semibold">Tên tài khoản: {authUser?.fullname}</p>
            <p>
              <span className="font-semibold">Email: </span>{authUser?.email ? authUser?.email : <span className="italic text-gray-400">Chưa cập nhật</span>}
            </p>
            <p>
              <span className="font-medium">Số điện thoại: </span>{authUser?.phone ? authUser.phone : <span className="italic text-gray-400">Chưa cập nhật</span>}
            </p>
            <p>
              <span className="font-medium">Loại tài khoản: </span>{"Khach hang"}
            </p>
          </div>
          <button
            onClick={() => { navigate("edit") }}
            className="ml-[50px] px-2 py-1 font-semibold text-amber-300 hover:bg-amber-50 border border-amber-300 rounded-sm flex items-center justify-center"
          >
            Cập nhật<AiFillEdit />
          </button>
        </div>
      </div>
      <div className=" mb-10 "></div>
    </div>
  );

}

export default Profile