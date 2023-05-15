import { useState } from 'react';
import Icon from '../assets/genres/biography.jpeg';
import { Product } from '../types/Products';

type CartProps = {
  products: Product[];
  onRemoveProduct: (productId: string) => void;
  onPay: (selectedProducts: Product[]) => void;
};

const Cart = ({ products, onRemoveProduct, onPay }: CartProps) => {
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const totalPrice = selectedProducts.reduce((total, product) => total + product.price, 0);

  const handleToggleSelect = (productId: string) => {
    const product = products.find((p) => p.id === productId);
    if (product) {
      if (selectedProducts.some((p) => p.id === productId)) {
        setSelectedProducts(selectedProducts.filter((p) => p.id !== productId));
      } else {
        setSelectedProducts([...selectedProducts, product]);
      }
    }
  };

  return (
    <div className="bg-white p-4 rounded-md shadow-md">
      <h2 className="text-lg font-semibold mb-4">Cart</h2>
      {products.length > 0 ? (
        <>
          <ul className="divide-y divide-gray-200">
            {products.map((product) => (
              <li key={product.id} className="py-4 flex">
                <input
                  type="checkbox"
                  checked={selectedProducts.some((p) => p.id === product.id)}
                  onChange={() => handleToggleSelect(product.id)}
                  className="h-6 w-6 mr-4"
                />
                <img src={product.img} alt={product.name} className="h-16 w-16 object-contain mr-4" />
                <div className="flex-grow">
                  <h3 className="font-medium">{product.name}</h3>
                  <p className="text-gray-600">{product.author}</p>
                  <p className="text-gray-600">Price: ${product.price}</p>
                  <button className="text-red-600 hover:text-red-800" onClick={() => onRemoveProduct(product.id)}>
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex justify-end">
            <div className="text-gray-600 mr-4">Total: ${totalPrice}</div>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600" onClick={() => onPay(selectedProducts)}>
              Pay
            </button>
          </div>
        </>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};

export default Cart;
