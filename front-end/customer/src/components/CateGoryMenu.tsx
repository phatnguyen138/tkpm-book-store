import { NavLink } from 'react-router-dom';
import { useState, useEffect } from "react"
import { Genre } from '../types/Genres';
import {getAllGenre} from '../lib/axios/genre'
import { genreName } from "../mockData/Genres";

// const genres: Genre[] = genreName.map((genre) => {
//   return {
//     id: genre.id,
//     name: genre.name,
//     image: genre.image,
//     description: genre.description
//   }
// });

interface GenreType {
  genre_id: number;
  name: string;
}

const CategoryMenu: React.FC = () => {
  const [genres, setGenres] = useState<GenreType[]>([]);

  useEffect(() => {
    async function fetchGenres() {
      try {
        const genresData = await getAllGenre();
        setGenres(genresData.data);
      } catch (error) {
        // Handle error
      }
    }

    fetchGenres();
  }, []);

  return (
    <div className="relative left-4 top-4 flex flex-col items-center bg-white border border-gray-300 rounded p-4">
      <h2 className="text-xl font-bold mb-4">Thể loại sách</h2>
      <ul className="flex flex-col items-center">

        {genres.map((genre, index) => (
          <NavLink key={genre.genre_id} to={`/list/${genre.name}`}>
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