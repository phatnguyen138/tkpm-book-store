import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Bill } from '../types/Bill';
import { getBills, deleteBill } from '../lib/axios/bill';
import SearchComponent from '../components/SearchBook';

const ViewBillList: React.FC = () => {
  const [billList, setBillList] = useState<Bill[]>([]);

  useEffect(() => {
    getBills()
      .then((response) => {
        setBillList(response);
        console.log(response)
      })
      .catch((error) => {
        console.error('Error fetching product list:', error);
      });
  }, []);

  const handleDeleteBill = (billId: number) => {
    deleteBill(billId)
      .then(() => {
        console.log('Bill deleted:', billId);
        getBills();
      })
      .catch((error) => {
        console.error('Error deleting bill:', error);
      });
  };

  return (
    <div className="px-4 py-6">
      <h2 className="text-2xl font-semibold mb-4">Danh sách Phiếu thu tiền</h2>
      <SearchComponent /> {/* Thêm SearchComponent vào đây */}
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-blue-500 text-white">
            <th className="py-2 px-4">ID</th>
            <th className="py-2 px-4">Họ tên</th>
            <th className="py-2 px-4">Email</th>
            <th className="py-2 px-4">Phone</th>
            <th className="py-2 px-4">Địa chỉ</th>
            <th className="py-2 px-4">Tổng tiền thu</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {billList.map((bill) => (
            <tr key={bill.bill_id} className="border-b">
              <td className="py-2 px-4 text-center">{bill.bill_id}</td>
              <td className="py-2 px-4 text-center">{bill.fullname}</td>
              <td className="py-2 px-4 text-center">{bill.email}</td>
              <td className="py-2 px-4 text-center">{bill.phone}</td>
              <td className="py-2 px-4 text-center">{bill.address}</td>
              <td className="py-2 px-4 text-center">{bill.total_amount}</td>
              <td className="py-2 px-4 text-center">
                <div className="space-x-2">
                  <Link
                    to={`/edit-bill/${bill.bill_id}`}
                    className="bg-blue-500 text-white py-1 px-2 rounded"
                  >
                    Edit
                  </Link>
                  <button
                    className="bg-red-500 text-white py-1 px-2 rounded"
                    onClick={() => handleDeleteBill(bill.bill_id)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewBillList;
