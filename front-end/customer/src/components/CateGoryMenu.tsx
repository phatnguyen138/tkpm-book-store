import { NavLink } from 'react-router-dom';
import { Genre } from '../types/Genres';
import { genreName } from "../mockData/Genres";

const genres: Genre[] = genreName.map((genre) => {
  return {
    id: genre.id,
    name: genre.name,
    image: genre.image,
    description: genre.description
  }
});

const CategoryMenu: React.FC = () => {

  return (
    <div className="relative left-4 top-4 flex flex-col items-center bg-white border border-gray-300 rounded p-4">
      <h2 className="text-xl font-bold mb-4">Thể loại sách</h2>
      <ul className="flex flex-col items-center">

        {genres.map((genre, index) => (
          <NavLink key={genre.id} to={`/list/${genre.description}`}>
            <li key={index} className="text-gray-800 mb-2">
              {genre.name}
            </li>
          </NavLink>
        ))}
      </ul>
    </div>
  );
};

export default CategoryMenu;