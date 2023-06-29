import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { NewProduct, Product } from '../types/Products';
import { GenreInfo } from '../types/Genres'
import { Author } from '../types/Authors';
import { getAllGenre } from '../lib/axios/genre';
import { getAllAuthors } from '../lib/axios/authors';
import { updateProductById, getProductById } from '../lib/axios/products';

const EditProductPage: React.FC = () => {
  const {id} = useParams();
  const token = localStorage.getItem('access_token') ? localStorage.getItem('access_token') : "";
  const [isBookCreated, setIsBookCreated] = useState<boolean>(false);
  const [currentImage, setCurrentImage]= useState<string>("");
  const navigate = useNavigate();
  const [product, setProduct] = useState<NewProduct>({
    title: '',
    authors: '',
    image: null,
    price: 0,
    genres: '',
    quantity: 0
  });
  // Handle genres select
  const [genreList, setGenreList] = useState<GenreInfo[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  useEffect(() => {
    async function fetchGenres() {
      try {
        const response = await getAllGenre();
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
    async function fetchAuthors() {
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

    fetchAuthors();
  }, []);

  // Load book info
  useEffect(()=>{
    async function fetchBook() {
      try {
        const response = await getProductById(id ? id : "", token ? token : "");
        const { data } = response;
        setCurrentImage(data.image);
    
        // Set the selected genres based on the received data
        const selectedGenreList = data.genres.split(", ");
        setSelectedGenres(selectedGenreList);
    
        // Set the selected authors based on the received data
        const selectedAuthorList = data.authors.split(", ");
        setSelectedAuthors(selectedAuthorList);
    
        const bookData: NewProduct = {
          title: data.title,
          image: null,
          price: data.price,
          quantity: data.quantity,
          authors: data.authors,
          genres: data.genres,
        };
        setProduct(bookData);
      } catch (error) {
        console.log('Error fetching book:', error);
      }
    }

    fetchBook();
  },[])

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
      const imageUrl = URL.createObjectURL(file); // Create a URL for the selected file
      setCurrentImage(imageUrl); // Update the current image
      setProduct((prevProduct) => ({
        ...prevProduct,
        image: file,
      }));
    }
  }

  const [errors, setError] = useState<string>("");
  // Handle submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!product.title) {
        throw new Error("Title is required.");
      }
      if (product.price <= 0) {
        throw new Error("Price must be greater than zero.");
      }
      if (product.quantity <= 0) {
        throw new Error("Quantity must be greater than zero.");
      }
      if (product.image === null) {
        throw new Error("Please upload the cover!");
      }
      if (product.authors === "") {
        throw new Error("Please choose at least 1 author!");
      }
      if (product.genres === "") {
        throw new Error("Please choose at least 1 genre!");
      }
      console.log("Product:" + product);
      await updateProductById(product, token ? token : "", id? id : "");
      setIsBookCreated(true);
    } catch (error: any) {
      setError(error.message);
    }
  };

  function createSuccess () {
    setIsBookCreated(false)
    navigate("/edit-product");
  }

  return (
    <div className="px-4 py-6">
      <h2 className="text-2xl font-semibold mb-4">Add Product</h2>
      <form action='/profile' method='post' encType='multipart/form-data' onSubmit={handleSubmit} className="max-w-md">
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
          <input type="file" name="image" onChange={handleImageChange} />
          {currentImage && (
            <img
              src={currentImage}
              alt="Preview"
              className="mt-2 w-20 h-20 object-cover rounded"
            />
          )}
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
          <label htmlFor="price" className="block font-medium mb-1">
            Quantity:
          </label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={product.quantity}
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
              <option key={genre.genre_id} value={genre.name}>
                {genre.name}
              </option>
            ))}
          </select>
        </div>
        {errors && (
          <div className="text-red-500 mb-4">{errors}</div>
        )}
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
          Thêm sản phẩm
        </button>
      </form>
      {isBookCreated && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg">
            <p>Book created</p>
            <button
              onClick={createSuccess}
              className="bg-blue-500 text-white py-2 px-4 rounded mt-4"
            >
              Ok
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProductPage;
