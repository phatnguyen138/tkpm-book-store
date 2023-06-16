import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {Product} from '../types/Products'
import {getProductList} from '../lib/axios/products'


const ViewProductList: React.FC = () => {
    const [productList, setProductList] = useState<Product[]>([]);

    useEffect(() => {
      getProductList()
        .then((response) => {
          setProductList(response);
          console.log(response)
        })
        .catch((error) => {
          console.error('Error fetching product list:', error);
        });
    }, []);

    return (
        <div className="px-4 py-6">
          <h2 className="text-2xl font-semibold mb-4">Product List</h2>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="py-2 px-4">ID</th>
                <th className="py-2 px-4">Name</th>
                <th className="py-2 px-4">Author</th>
                <th className="py-2 px-4">Price</th>
                <th className="py-2 px-4">Genres</th>
                <th className="py-2 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {productList.map((product) => (
                <tr key={product.id} className="border-b">
                  <td className="py-2 px-4 text-center">{product.id}</td>
                  <td className="py-2 px-4 text-center">{product.name}</td>
                  <td className="py-2 px-4 text-center">{product.author}</td>
                  <td className="py-2 px-4 text-center">{product.price}</td>
                  <td className="py-2 px-4 text-center">{product.genres.join(', ')}</td>
                  <td className="py-2 px-4 text-center">
                    <div className="space-x-2">
                      <Link
                        to={`/edit-product/${product.id}`}
                        className="bg-blue-500 text-white py-1 px-2 rounded"
                      >
                        Update
                      </Link>
                      <button className="bg-red-500 text-white py-1 px-2 rounded">Delete</button>
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
