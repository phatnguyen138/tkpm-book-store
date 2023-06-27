import { useParams, Link } from 'react-router-dom'
import { Product as ProductType } from '../types/Products';
import { getShopProductListByFilter } from '../lib/axios/products'
import { useState, useEffect } from "react"

function SearchBookList(): JSX.Element {
  const { keyword, page } = useParams();
  var paging : number = page ? parseInt(page) - 1 : 0;;
  const token = localStorage.getItem('access_token') ? localStorage.getItem('access_token') : "";
  const [productList, setProductList] = useState<ProductType[]>([]);
  const [title, setTitle] = useState<string>("");
  const [offset, setOffset] = useState<number>(1);
  const limit: number = 20;

  const fetchProductList = async (filterOptions: Record<string, string | string[]>, token: string) => {
    try {
      const products = await getShopProductListByFilter(filterOptions, token);
      console.log(products.data)
      setProductList(products.data);
    } catch (error) {
      console.log("Error loading book list");
    }
  };

  useEffect(() => {
    setTitle(keyword as string);
    paging = page ? parseInt(page) - 1 : 0;
    setOffset(paging * limit + 1);
  }, [keyword, page]);

  useEffect(() => {
    const filterOptions: Record<string, string | string[]> = {};
    if (title !== "") {
      filterOptions.title = title;
    }
    // Add other filters as needed...

    filterOptions.limit = limit.toString();
    filterOptions.offset = offset.toString();

    fetchProductList(filterOptions, token as string);
  }, [title, offset, token]);

  return (
    <div>
      <div className="grid grid-cols-5 gap-4">
        {productList.map((product) => (
          <Link key={product.book_id} to={`/product/${product.book_id}`}>
            <div key={product.book_id}>
              <img className="w-50 h-80" src={product.image} alt={product.title} />
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
            to={`/list/${title}/${paging - 1}`}
            className="px-4 py-2 bg-gray-800 text-white rounded-md mr-2"
          >
            Previous
          </Link>
        )}
        <span className="px-4 py-2 bg-gray-200 rounded-md mr-2">
          {offset}
        </span>
        {1 < 2 && (
          <Link
            to={`/list/${title}/${paging + 1}`}
            className="px-4 py-2 bg-gray-800 text-white rounded-md"
          >
            Next
          </Link>
        )}
      </div>
    </div>
  );
}


export default SearchBookList;