import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserInfo } from '../types/User';
import { getAllUsers } from '../lib/axios/user';


const ViewUserList: React.FC = () => {
  const token = localStorage.getItem('access_token') ? localStorage.getItem('access_token') : "";
  const [userList, setUserList] = useState<UserInfo[]>([]);

  useEffect(() => {
    fetchProductList();
  }, []);

  const fetchProductList = () => {
    getAllUsers(token? token : "")
      .then((response) => {
        setUserList(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error fetching product list:', error);
      });
  };

  const handleDelete = async (id: number) => {
    try {
    //   await deleteBookById(id, token? token : "");
      fetchProductList(); // Refresh the product list after successful deletion
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  return (
    <div className="px-4 py-6">
      <h2 className="text-2xl font-semibold mb-4">Book List</h2>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-blue-500 text-white">
            <th className="py-2 px-4">ID</th>
            <th className="py-2 px-4">Name</th>
            <th className="py-2 px-4">Email</th>
            <th className="py-2 px-4">Role</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {userList.map((user) => (
            <tr key={user.user_id} className="border-b">
              <td className="py-2 px-4 text-center">{user.user_id}</td>
              <td className="py-2 px-4 text-center">{user.fullname}</td>
              <td className="py-2 px-4 text-center">{user.email}</td>
              <td className="py-2 px-4 text-center">{user.role_id === 1? "Admin" : "Customer"}</td>
              <td className="py-2 px-4 text-center">
                <div className="space-x-2">
                  <button className="bg-red-500 text-white py-1 px-2 rounded" onClick={() => handleDelete(user.user_id)}>Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewUserList;
