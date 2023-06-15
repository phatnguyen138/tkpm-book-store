import { NavLink, useParams, useNavigate, Link } from 'react-router-dom'
import { Product as ProductType } from '../types/Products';
import { products } from '../mockData/Products';
import { getProductList, getProductListByFilter } from '../lib/axios/products'
import { useAsync } from '../hooks/useAsync';
import { useState, useEffect } from "react"

const productList: ProductType[] = products.map((product) => {
  return {
    id: product.id,
    name: product.name,
    author: product.author,
    img: product.img,
    price: product.price,
    quantity: product.quantity,
    discountRate: product.discountRate,
    genres: product.genres,
  };
});

interface ProductListProps {
  category: string;
  page: string;
}


function ProductListPage(): JSX.Element {
  const { type, page } = useParams();
  const currentPage = page ? parseInt(page) : 1;
  const itemsPerPage = 20;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedProducts = productList.slice(0, 20);

  return (
    <div>
      <div className="grid grid-cols-5 gap-4">
        {displayedProducts.map((product) => (
          <Link key={product.id} to={`/product/${product.id}`}>
            <div key={product.id}>
              <img src={product.img} alt={product.name} />
              <p>{product.name}</p>
              <p>{product.author}</p>
              <p>Giá: ${product.price}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="flex justify-end mt-4">
        {currentPage > 1 && (
          <Link
            to={`/list/${type}/${currentPage - 1}`}
            className="px-4 py-2 bg-gray-800 text-white rounded-md mr-2"
          >
            Previous
          </Link>
        )}
        <span className="px-4 py-2 bg-gray-200 rounded-md mr-2">
          {currentPage}
        </span>
        {endIndex < productList.length && (
          <Link
            to={`/list/${type}/${currentPage + 1}`}
            className="px-4 py-2 bg-gray-800 text-white rounded-md"
          >
            Next
          </Link>
        )}
      </div>
    </div>
  );
}


export default ProductListPage;