import React, { useState } from 'react';
import { NewProduct } from '../types/Products';

const AddProductPage: React.FC = () => {
  const [product, setProduct] = useState<NewProduct>({
    name: '',
    author: '',
    img: '',
    price: 0,
    quantity: 0,
    genres: [],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.options)
      .filter((option) => option.selected)
      .map((option) => option.value);
    setProduct((prevProduct) => ({
      ...prevProduct,
      genres: selectedOptions,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission, e.g., send data to the server
    console.log(product);
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
            id="name"
            name="name"
            value={product.name}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="author" className="block font-medium mb-1">
            Author:
          </label>
          <input
            type="text"
            id="author"
            name="author"
            value={product.author}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="img" className="block font-medium mb-1">
            Image URL:
          </label>
          <input
            type="text"
            id="img"
            name="img"
            value={product.img}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
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
          <label htmlFor="quantity" className="block font-medium mb-1">
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
            value={product.genres}
            onChange={handleGenreChange}
            className="border border-gray-300 rounded px-3 py-2 w-full"
          >
            <option value="genre1">Genre 1</option>
            <option value="genre2">Genre 2</option>
            {/* Add more genre options as needed */}
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
