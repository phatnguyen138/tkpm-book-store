import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getOrderById } from '../lib/axios/orders';

interface Order {
    order_id: number;
    user_id: number;
    order_date: string;
    total_amount: number;
    payment_status: number;
    payment_provider: string;
    address_shipping: string;
    phone_shipping: string;
    user: {
      fullname: string;
      email: string;
      address: string;
      phone: string;
    };
  }

const ViewOrderDetail: React.FC = () => {
    const token = localStorage.getItem('access_token') ? localStorage.getItem('access_token') : "";
    const {id} = useParams();
    const [order, setOrder] = useState<Order | null>(null);

    useEffect(() => {
      const fetchOrder = async () => {
        try {
          const response = await getOrderById(token ? token : "", id ? id : "");
          if (response.success) {
            setOrder(response.data);
          }
        } catch (error) {
          console.error('Error fetching order:', error);
        }
      };
  
      fetchOrder();
    }, [token, id]);
  
    if (!order) {
      return <div>Loading...</div>;
    }
  
    return (
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4">Order Details</h1>
          <p>
            <span className="font-bold">Order Date:</span> {order.order_date}
          </p>
          <p>
            <span className="font-bold">Total Amount:</span> {order.total_amount}
          </p>
          <p>
            <span className="font-bold">Payment Provider:</span>{' '}
            {order.payment_provider}
          </p>
          <p>
            <span className="font-bold">Address:</span> {order.address_shipping}
          </p>
          <p>
            <span className="font-bold">Phone:</span> {order.phone_shipping}
          </p>
          <p>
            <span className="font-bold">Username:</span> {order.user.fullname}
          </p>
          <p>
            <span className="font-bold">Email:</span> {order.user.email}
          </p>
        </div>
      );
};

export default ViewOrderDetail;