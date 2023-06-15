import { useState } from "react";
import { NavLink } from 'react-router-dom';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';
import {Genre} from '../types/Genres'
import {genreName} from "../mockData/Genres"

const genres: Genre[] = genreName.map((genre) => {
    return {
        id: genre.id,
        name: genre.name,
        image: genre.image,
        description: genre.description
    }
});

function ProductCategories(): JSX.Element {
    const [page, setPage] = useState(0);

    const onNextPage = () => {
        setPage(page + 1);
    };

    const onPrevPage = () => {
        setPage(page - 1);
    };

    const displayedGenres = genres.slice(page * 5, page * 5 + 5);

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
                        className={`rounded-full w-8 h-8 flex items-center justify-center ${genres.length <= (page + 1) * 5 ? 'bg-gray-200' : 'bg-slate-500'}`}
                        disabled={genres.length <= (page + 1) * 5}
                        onClick={onNextPage}
                    >
                        <IoChevronForward className="text-lg" />
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-5 gap-4">
                {displayedGenres.map((genre) => (
                    <NavLink key={genre.id} to={`/list/${genre.description}`}>
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