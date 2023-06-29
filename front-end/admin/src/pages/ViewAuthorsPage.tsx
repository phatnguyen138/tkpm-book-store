import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllAuthors } from '../lib/axios/authors';
import { Author } from '../types/Authors';


const ViewAuthorsPage: React.FC = () => {
    const [authorList, setAuthorList] = useState<Author[]>([]);

    useEffect(() => {
        async function fetchGenres() {
          try {
            const response = await getAllAuthors();
            const { data } = response;
            const mappedAuthors = data.map((authorData: any) => ({
              author_id: authorData.author_id,
              name: authorData.name,
            })) as Author[];
            setAuthorList(mappedAuthors);
          } catch (error) {
            console.log('Error fetching genres:', error);
          }
        }
    
        fetchGenres();
      }, []);

    return (
        <div className="px-4 py-6">
          <h2 className="text-2xl font-semibold mb-4">Danh sách tác giả</h2>

          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="py-2 px-4">ID</th>
                <th className="py-2 px-4">Name</th>
                <th className="py-2 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {authorList?.map((author) => (
                <tr key={author.author_id} className="border-b">
                  <td className="py-2 px-4 text-center">{author.author_id}</td>
                  <td className="py-2 px-4 text-center">{author.name}</td>
                  <td className="py-2 px-4 text-center">
                    <div className="space-x-2">
                      <Link
                        to={`/edit-product/${author.author_id}`}
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

export default ViewAuthorsPage;
