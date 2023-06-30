import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllOrders } from '../lib/axios/orders';
import { OrderInfo } from '../types/Orders';

const ViewOrders: React.FC = () => {
    const [orderList, setOrderList] = useState<OrderInfo[]>([]);

    useEffect(() => {
        fetchOrderList();
    }, []);

    const fetchOrderList = async () => {
        getAllOrders()
            .then((response) => {
                const { data } = response;
                const orders = data.orders.map((order: any) => ({
                    order_id: order.order_id,
                    user_name: order.user.fullname,
                    order_date: order.order_date,
                    total_amount: order.total_amount,
                    address_shipping: order.address_shipping,
                    phone_shipping: order.phone_shipping
                })) as OrderInfo[];

                setOrderList(orders);
            })
            .catch((error) => {
                console.error('Error fetching product list:', error);
            });
    };


    return (
        <div className="px-4 py-6">
            <h2 className="text-2xl font-semibold mb-4">Order List</h2>

            <table className="w-full border-collapse">
                <thead>
                    <tr className="bg-blue-500 text-white">
                        <th className="py-2 px-4">Order Id</th>
                        <th className="py-2 px-4">User name</th>
                        <th className="py-2 px-4">Order Date</th>
                        <th className="py-2 px-4">Total amount</th>
                        <th className="py-2 px-4">Address</th>
                        <th className="py-2 px-4">Phone</th>
                        <th className="py-2 px-4">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {orderList.map((order) => (
                        <tr key={order.order_id} className="border-b">
                            <td className="py-2 px-4 text-center">{order.order_id}</td>
                            <td className="py-2 px-4 text-center">{order.user_name}</td>
                            <td className="py-2 px-4 text-center">{order.order_date}</td>
                            <td className="py-2 px-4 text-center">{order.total_amount}</td>
                            <td className="py-2 px-4 text-center">{order.address_shipping}</td>
                            <td className="py-2 px-4 text-center">{order.phone_shipping}</td>
                            <td className="py-2 px-4 text-center">
                                <div className="space-x-2">
                                    <Link
                                        to={`/edit-product/${order.order_id}`}
                                        className="bg-blue-500 text-white py-1 px-2 rounded"
                                    >
                                        View
                                    </Link>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ViewOrders;