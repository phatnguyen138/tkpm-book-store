import React, { useState, useEffect } from 'react';
import { Bill } from '../types/Bill';
import { updateBill, getBillById } from '../lib/axios/bill';
import { useParams } from 'react-router-dom';

const EditBillPage: React.FC = () => {
  const { id } = useParams();
  const [bill, setBill] = useState<Bill>({
    bill_id: id as number,
    fullname: '',
    email: '',
    phone: '',
    address: '',
    total_amount: 0,
    bill_date: '',
  });

  useEffect(() => {
    getBillById(id as number)
      .then((response) => {
        setBill(response);
        console.log(response);
      })
      .catch((error) => {
        console.error('Error fetching bill:', error);
      });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBill((prevBill) => ({
      ...prevBill,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(bill);
    updateBill(id,bill)
      .then((response) => {
        console.log('Bill updated:', response);
        // Thêm logic xử lý thành công tại đây, ví dụ như chuyển hướng hoặc hiển thị thông báo
      })
      .catch((error) => {
        console.error('Error updating bill:', error);
        // Thêm logic xử lý lỗi tại đây, ví dụ như hiển thị thông báo lỗi
      });
  };

  return (
    <div className="px-4 py-6">
      <h2 className="text-2xl font-semibold mb-4">Edit Bill</h2>
      <form onSubmit={handleSubmit} className="max-w-md">
        <div className="mb-4">
          <label htmlFor="fullname" className="block font-medium mb-1">
            Fullname:
          </label>
          <input
            type="text"
            id="fullname"
            name="fullname"
            value={bill.fullname}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block font-medium mb-1">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={bill.email}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="phone" className="block font-medium mb-1">
            Phone:
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={bill.phone}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="address" className="block font-medium mb-1">
            Address:
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={bill.address}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="total_amount" className="block font-medium mb-1">
            Total Amount:
          </label>
          <input
            type="number"
            id="total_amount"
            name="total_amount"
            value={bill.total_amount}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
          Update Bill
        </button>
      </form>
    </div>
  );
};

export default EditBillPage;
