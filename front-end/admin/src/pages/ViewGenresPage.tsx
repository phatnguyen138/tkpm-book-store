import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllGenre, getGenreInfo } from '../lib/axios/genre';
import { GenreInfo, EachGenre } from '../types/Genres';


const ViewGenresPage: React.FC = () => {
    const [infoList, setInfoList] = useState<GenreInfo[]>();
    const [genres, setGenres] = useState<EachGenre[]>();

    const fetchProduct = async () => {
        try {
            const response = await getAllGenre();
            console.log(response.data)
            setInfoList(response.data);
        } catch (error) {
            console.log("Error loading item detail");
        }
    };

    useEffect(() => {
        fetchProduct();
    }, []);


    useEffect(() => {
        const fetchGenreInfo = async () => {
            if (infoList && infoList.length > 0) {
              const genrePromises = infoList.map(async (genre) => {
                const genreInfoResponse = await getGenreInfo(genre.genre_id.toString());
                return genreInfoResponse.data;
              });
          
              const genreInfoList = await Promise.all(genrePromises);
              setGenres(genreInfoList);
            }
          };

        fetchGenreInfo();
    }, [infoList]);

    return (
        <div className="px-4 py-6">
          <h2 className="text-2xl font-semibold mb-4">Danh sách thể loại</h2>

          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="py-2 px-4">ID</th>
                <th className="py-2 px-4">Name</th>
                <th className="py-2 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {genres?.map((product) => (
                <tr key={product.genre_id} className="border-b">
                  <td className="py-2 px-4 text-center">{product.genre_id}</td>
                  <td className="py-2 px-4 text-center">{product.name}</td>
                  <td className="py-2 px-4 text-center">
                    <div className="space-x-2">
                      <Link
                        to={`/edit-product/${product.genre_id}`}
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

export default ViewGenresPage;
