import React, { useState, useEffect } from 'react';
import { NewProduct } from '../types/Products';
import { GenreInfo } from '../types/Genres'
import { Author } from '../types/Authors';
import { getAllGenres } from '../lib/axios/genre';
import { getAllAuthors } from '../lib/axios/authors';
import { createNewProduct } from '../lib/axios/products';

const AddProductPage: React.FC = () => {
  const [product, setProduct] = useState<NewProduct>({
    title: '',
    authors: '',
    image: null,
    price: 0,
    genres: '',
  });
  // Handle genres select
  const [genreList, setGenreList] = useState<GenreInfo[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  useEffect(() => {
    async function fetchGenres() {
      try {
        const response = await getAllGenres();
        const { data } = response;
        const mappedGenres = data.map((genreData: any) => ({
          id: genreData.genre_id,
          name: genreData.name,
        })) as GenreInfo[];
        setGenreList(mappedGenres);
      } catch (error) {
        console.log('Error fetching genres:', error);
      }
    }

    fetchGenres();
  }, []);

    // Handle author select
    const [authorList, setAuthorList] = useState<Author[]>([]);
    const [selectedAuthors, setSelectedAuthors] = useState<string[]>([]);
    useEffect(() => {
      async function fetchGenres() {
        try {
          const response = await getAllAuthors();
          const { data } = response;
          const mappedAuthors = data.map((authorData: any) => ({
            id: authorData.author_id,
            name: authorData.name,
          })) as Author[];
          setAuthorList(mappedAuthors);
        } catch (error) {
          console.log('Error fetching genres:', error);
        }
      }
  
      fetchGenres();
    }, []);

  // Handle forms
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  function handleGenreChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const clickedOptionValue = e.target.value;
    const isOptionSelected = selectedGenres.includes(clickedOptionValue);
    const remainingSelectedGenres = selectedGenres.filter(
      (genre) => genre !== clickedOptionValue
    );
  
    let updatedSelectedGenres;
    if (isOptionSelected && remainingSelectedGenres.length === 0) {
      // Prevent deselecting the last remaining option
      updatedSelectedGenres = selectedGenres;
    } else if (isOptionSelected) {
      updatedSelectedGenres = remainingSelectedGenres;
    } else {
      updatedSelectedGenres = [...selectedGenres, clickedOptionValue];
    }
  
    setSelectedGenres(updatedSelectedGenres);
  
    // Format the selected genres as a string
    const formattedGenres = updatedSelectedGenres.join(", ");
    setProduct((prevProduct) => ({
      ...prevProduct,
      genres: formattedGenres,
    }));
  }

  function handleAuthorChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const clickedOptionValue = e.target.value;
    const isOptionSelected = selectedAuthors.includes(clickedOptionValue);
    const remainingSelectedAuthors = selectedAuthors.filter(
      (author) => author !== clickedOptionValue
    );
  
    let updatedSelectedAuthors;
    if (isOptionSelected && remainingSelectedAuthors.length === 0) {
      // Prevent deselecting the last remaining option
      updatedSelectedAuthors = selectedAuthors;
    } else if (isOptionSelected) {
      updatedSelectedAuthors = remainingSelectedAuthors;
    } else {
      updatedSelectedAuthors = [...selectedAuthors, clickedOptionValue];
    }
  
    setSelectedAuthors(updatedSelectedAuthors);
  
    // Format the selected genres as a string
    const formattedAuthors = updatedSelectedAuthors.join(", ");
    setProduct((prevProduct) => ({
      ...prevProduct,
      authors: formattedAuthors,
    }));
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (files !== null && files.length > 0) {
      const file = files[0];
      setProduct((prevProduct) => ({
        ...prevProduct,
        image: file,
      }));
    }
  }

  // Handle submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission, e.g., send data to the server
    console.log(product);
    createNewProduct(product);
  };

  return (
    <div className="px-4 py-6">
      <h2 className="text-2xl font-semibold mb-4">Add Product</h2>
      <form onSubmit={handleSubmit} className="max-w-md">
        <div className="mb-4">
          <label htmlFor="name" className="block font-medium mb-1">
            Name:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={product.title}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="genres" className="block font-medium mb-1">
            Authors:
          </label>
          <select
            id="authors"
            name="authors"
            multiple
            value={selectedAuthors}
            onChange={handleAuthorChange}
            className="border border-gray-300 rounded px-3 py-2 w-full"
          >
            {authorList.map((author) => (
              <option key={author.author_id} value={author.name}>
                {author.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="img" className="block font-medium mb-1">
            Cover:
          </label>
          <form action='/images' method='post' encType="multipart/form-data">
              <input type="file" name="image" onChange={ handleImageChange }/>
          </form>
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block font-medium mb-1">
            Price:
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={product.price}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="genres" className="block font-medium mb-1">
            Genres:
          </label>
          <select
            id="genres"
            name="genres"
            multiple
            value={selectedGenres}
            onChange={handleGenreChange}
            className="border border-gray-300 rounded px-3 py-2 w-full"
          >
            {genreList.map((genre) => (
              <option key={genre.id} value={genre.name}>
                {genre.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
          Thêm sản phẩm
        </button>
      </form>
    </div>
  );
};

export default AddProductPage;
