import { useState, useEffect } from "react";
import { NavLink } from 'react-router-dom';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';
import { getAllGenre, getGenreInfo } from "../lib/axios/genre";
import { GenreInfo, EachGenre } from '../types/Genres'
import { genreName } from "../mockData/Genres"

function ProductCategories(): JSX.Element {
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
    // Set paging
    const [page, setPage] = useState(0);

    const onNextPage = () => {
        setPage(page + 1);
    };

    const onPrevPage = () => {
        setPage(page - 1);
    };

    const displayedGenres = genres?.slice(page * 5, page * 5 + 5);

    return (
        <div className="container mx-auto py-8">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold">Danh mục sản phẩm</h2>
                <div className="flex items-center">
                    <button
                        className={`rounded-full w-8 h-8 flex items-center justify-center mr-2 ${page === 0 ? 'bg-gray-200' : 'bg-slate-500'}`}
                        disabled={page === 0}
                        onClick={onPrevPage}
                    >
                        <IoChevronBack className="text-lg" />
                    </button>
                    <button
                        className={`rounded-full w-8 h-8 flex items-center justify-center ${genres?.length?? 0 <= (page + 1) * 5 ? 'bg-gray-200' : 'bg-slate-500'}`}
                        disabled={Number(genres?.length ?? 0) <= (page + 1) * 5}
                        onClick={onNextPage}
                    >
                        <IoChevronForward className="text-lg" />
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-5 gap-4">
                {displayedGenres?.map((genre) => (
                    <NavLink key={genre.genre_id} to={`/list/${genre.name}`}>
                        <div className="flex flex-col items-center">
                            <img
                                src={genre.image}
                                alt={genre.name}
                                className="h-40 object-contain mb-2"
                            />
                            <span className="text-sm font-medium">{genre.name}</span>
                        </div>
                    </NavLink>
                ))}
            </div>
        </div>
    );
};

export default ProductCategories;