import CategoryMenu from "../components/CateGoryMenu";
import SearchBookList from "../components/SearchBookList";

function SearchPage() : JSX.Element {
  // const { category, page } = useParams();

  return (
    <div className="flex">
      <div className="w-1/6 pr-4">
        <CategoryMenu />
      </div>
      <div className="w-5/6 pl-4 pt-4">
        <SearchBookList />
      </div>
    </div>
  );
}

export default SearchPage;