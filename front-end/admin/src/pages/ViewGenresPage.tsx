import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllGenre, deleteGenreById } from '../lib/axios/genre';
import { Genre } from '../types/Genres';


const ViewAuthorsPage: React.FC = () => {
  const token = localStorage.getItem('access_token') ? localStorage.getItem('access_token') : "";
  const [genreList, setGenreList] = useState<Genre[]>([]);

  async function fetchGenres() {
    try {
      const response = await getAllGenre();
      const { data } = response;
      const mappedGenres = data.map((genreData: any) => ({
        genre_id: genreData.genre_id,
        name: genreData.name
      })) as Genre[];
      setGenreList(mappedGenres);
    } catch (error) {
      console.log('Error fetching genres:', error);
    }
  }

  useEffect(() => {
    fetchGenres();
  }, []);

  async function handleDelete(id: string) {
    await deleteGenreById(token? token : "", id);
    fetchGenres();
  }

  return (
    <div className="px-4 py-6">
      <h2 className="text-2xl font-semibold mb-4">Genre List</h2>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-blue-500 text-white">
            <th className="py-2 px-4">ID</th>
            <th className="py-2 px-4">Name</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {genreList?.map((genre) => (
            <tr key={genre.genre_id} className="border-b">
              <td className="py-2 px-4 text-center">{genre.genre_id}</td>
              <td className="py-2 px-4 text-center">{genre.name}</td>
              <td className="py-2 px-4 text-center">
                <div className="space-x-2">
                <Link
                    to={`/edit-genre/${genre.genre_id}`}
                    className="bg-blue-500 text-white py-1 px-2 rounded"
                  >
                    Update
                  </Link>
                  <button className="bg-red-500 text-white py-1 px-2 rounded" onClick={()=>{handleDelete(genre.genre_id.toString())}}>Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewAuthorsPage;
