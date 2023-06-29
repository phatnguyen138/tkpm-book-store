import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types/Products'
import { getProductList } from '../lib/axios/products'
import { deleteBookById } from '../lib/axios/products';


const ViewProductList: React.FC = () => {
  const token = localStorage.getItem('access_token') ? localStorage.getItem('access_token') : "";
  const [productList, setProductList] = useState<Product[]>([]);

  useEffect(() => {
    fetchProductList();
  }, []);

  const fetchProductList = () => {
    getProductList()
      .then((response) => {
        setProductList(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error fetching product list:', error);
      });
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteBookById(id, token? token : "");
      fetchProductList(); // Refresh the product list after successful deletion
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  return (
    <div className="px-4 py-6">
      <h2 className="text-2xl font-semibold mb-4">Danh sách sách</h2>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-blue-500 text-white">
            <th className="py-2 px-4">ID</th>
            <th className="py-2 px-4">Name</th>
            <th className="py-2 px-4">Author</th>
            <th className="py-2 px-4">Quantity</th>
            <th className="py-2 px-4">Genres</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {productList.map((product) => (
            <tr key={product.book_id} className="border-b">
              <td className="py-2 px-4 text-center">{product.book_id}</td>
              <td className="py-2 px-4 text-center">{product.title}</td>
              <td className="py-2 px-4 text-center">{product.authors}</td>
              <td className="py-2 px-4 text-center">{product.quantity}</td>
              <td className="py-2 px-4 text-center">{product.genres}</td>
              <td className="py-2 px-4 text-center">
                <div className="space-x-2">
                  <Link
                    to={`/edit-product/${product.book_id}`}
                    className="bg-blue-500 text-white py-1 px-2 rounded"
                  >
                    Update
                  </Link>
                  <button className="bg-red-500 text-white py-1 px-2 rounded" onClick={() => handleDelete(product.book_id)}>Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewProductList;
