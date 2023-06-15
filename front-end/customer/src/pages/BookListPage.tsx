import {useParams} from 'react-router-dom'
import CategoryMenu from "../components/CateGoryMenu";
import ProductList from "../components/ProductList";

function BookListPage() : JSX.Element {
  // const { category, page } = useParams();

  return (
    <div className="flex">
      <div className="w-1/6 pr-4">
        <CategoryMenu />
      </div>
      <div className="w-5/6 pl-4 pt-4">
        <ProductList />
      </div>
    </div>
  );
}

export default BookListPage;