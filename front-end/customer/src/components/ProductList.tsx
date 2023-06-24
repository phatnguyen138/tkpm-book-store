import { NavLink, useParams, useNavigate, Link } from 'react-router-dom'
import { Product as ProductType } from '../types/Products';
import { products } from '../mockData/Products';
import { FilterOption } from '../types/Filter'
import { getProductList, getShopProductListByFilter } from '../lib/axios/products'
import { useAsync } from '../hooks/useAsync';
import { useState, useEffect } from "react"
import { off } from 'process';

function ProductListPage(): JSX.Element {
  const { type, page } = useParams();
  const genre: string = type && type !== "tat-ca" ? type : "";
  const offset : number = page ? parseInt(page) : 1;
  const author : string = "";
  const title : string = "";
  const limit : number = 20;
  const len : number = 100;
  const endIndex = limit*offset - 1;
  const filterOptions: Record<string, string | string[]> = {}
  if(genre != ""){
    filterOptions.genre = genre;
  }
  if(author != ""){
    filterOptions.author = author;
  }
  if(title != ""){
    filterOptions.title = title;
  }
  filterOptions.limit = limit.toString();
  filterOptions.offset = offset.toString();
  const token = localStorage.getItem('access_token') ? localStorage.getItem('access_token') : "";
  const [productList, setProductList] = useState<ProductType[]>([]);
  const fetchProductList = async (filterOptions : Record<string, string | string[]>, token: string) => {
    try {
      const products = await getShopProductListByFilter(filterOptions, token);
      console.log(products.data)
      setProductList(products.data);
    } catch (error) {
      console.log("Error loading book list");
    }
  };

  useEffect(() => {
    fetchProductList(filterOptions, token as string);
  }, []);

  return (
    <div>
      <div className="grid grid-cols-5 gap-4">
        {productList.map((product) => (
          <Link key={product.book_id} to={`/product/${product.book_id}`}>
            <div key={product.book_id}>
              <img className="w-60 h-80" src={product.image} alt={product.title} />
              <p>{product.title}</p>
              <p>{product.authors}</p>
              <p>Giá: ${product.price}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="flex justify-end mt-4">
        {offset > 1 && (
          <Link
            to={`/list/${type}/${offset - 1}`}
            className="px-4 py-2 bg-gray-800 text-white rounded-md mr-2"
          >
            Previous
          </Link>
        )}
        <span className="px-4 py-2 bg-gray-200 rounded-md mr-2">
          {offset}
        </span>
        {endIndex < len && (
          <Link
            to={`/list/${type}/${offset + 1}`}
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