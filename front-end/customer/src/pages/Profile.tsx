
import { useAppSelector } from "../hooks/hook"
import { getUserAccountType } from "../utils/user"
import { AiFillEdit } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate()
  const authUser = useAppSelector(state => state.user.authUser)


  return (
    <div className="px-3 py-3">
      <h4 className="font-semibold text-lg text-sky-600 my-1 mx-auto w-fit">Thông tin tài khoản</h4>
      <div className="flex items-center gap-3">
          <div className="w-[120px] h-[120px] rounded-full border border-gray-300 overflow-hidden">
            <img className= "object-cover w-full h-full"
              src={authUser?.img}
            />
          </div>
          <div className="flex flex-col">
            <p className="text-lg font-semibold">Tên tài khoản: {authUser?.name}</p>
            <p>
                <span className="font-semibold">Email: </span>{authUser?.email ? authUser?.email : <span className="italic text-gray-400">Chưa cập nhật</span>}
            </p>
            <p>
              <span className="font-medium">Số điện thoại: </span>{authUser?.phone  ? authUser.phone : <span className="italic text-gray-400">Chưa cập nhật</span>}
            </p>
            <p>
              <span className="font-medium">Loại tài khoản: </span>{authUser ? getUserAccountType(authUser.role) : ""}
            </p>
          </div>
          <button 
            onClick={() => {navigate("edit")}}
            className="ml-[50px] px-2 py-1 font-semibold text-amber-300 hover:bg-amber-50 border border-amber-300 rounded-sm flex items-center justify-center"
          >
            Cập nhật<AiFillEdit />
          </button>
      </div>


    </div>
  )
}

export default Profile