import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllOrders } from '../lib/axios/orders';
import { createReport, createReportDetail } from '../lib/axios/Report';

const AddReportPage: React.FC = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('access_token') ? localStorage.getItem('access_token') : "";
    const [note, setNote] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [orders, setOrders] = useState([]);
    const [reportId, setReportId] = useState<number | undefined>();

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = () => {
        getAllOrders()
            .then((response) => {
                const { data } = response;
                setOrders(data.orders);
            })
            .catch((error) => {
                console.error('Error fetching orders:', error);
            });
    };

    useEffect(() => {
        async function addReport() {
            try {
                const res = await createReport(token ? token : "");
                const { data } = res;
                const id = data.inventory_id;
                console.log("inventory id: ", 0);
                setReportId(id);
            } catch (error: any) {
                throw new Error(error.message);
            }
        }
        addReport();
    }, []);

    const handleNoteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNote(e.target.value);
    };

    const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStartDate(e.target.value);
    };

    const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEndDate(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Validate input fields
        if (!note || !startDate || !endDate) {
            console.error('Please fill in all fields');
            return;
        }

        // Compare dates and filter orders within the date range
        const filteredOrders = orders.filter((order: any) => {
            const orderDate = new Date(order.order_date);
            const start = new Date(startDate);
            const end = new Date(endDate);
            return orderDate >= start && orderDate <= end;
        });

        // Extract relevant information from filtered orders
        const reportData = filteredOrders.map((order: any) => {
            const { book_id } = order.items[0].book;
            const { quantity } = order.items[0];
            const { quantity: bookQuantity } = order.items[0].book;
            return { book_id, quantity, bookQuantity };
        });

        // Do something with the reportData and note
        reportData.map((order: any) => {
            createReportDetail(token ? token : "", reportId ? reportId : 0, order.book_id, order.bookQuantity, order.bookQuantity - order.quantity);
        })

        console.log('Note:', note);

        navigate("/view-reports");

        // // Clear form inputs
        // setNote('');
        // setStartDate('');
        // setEndDate('');
    };

    return (
        <div className="px-4 py-6">
            <h2 className="text-2xl font-semibold mb-4">Add Report</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="note" className="block font-semibold mb-1">
                        Note:
                    </label>
                    <input
                        type="text"
                        id="note"
                        className="border border-gray-300 p-2 rounded"
                        value={note}
                        onChange={handleNoteChange}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="startDate" className="block font-semibold mb-1">
                        Start Date:
                    </label>
                    <input
                        type="date"
                        id="startDate"
                        className="border border-gray-300 p-2 rounded"
                        value={startDate}
                        onChange={handleStartDateChange}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="endDate" className="block font-semibold mb-1">
                        End Date:
                    </label>
                    <input
                        type="date"
                        id="endDate"
                        className="border border-gray-300 p-2 rounded"
                        value={endDate}
                        onChange={handleEndDateChange}
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded"
                >
                    Create Report
                </button>
            </form>
        </div>
    );
};

export default AddReportPage;