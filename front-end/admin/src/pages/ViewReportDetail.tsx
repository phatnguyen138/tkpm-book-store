import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ReportInfo } from '../types/Report';
import { getAllReports } from '../lib/axios/Report';

const ViewReportDetail: React.FC = () => {
    const token = localStorage.getItem('access_token') ? localStorage.getItem('access_token') : "";
    const {id} = useParams();
    const [reportList, setReportList] = useState<ReportInfo[]>([]);

    useEffect(() => {
        fetchReportList();
    }, []);

    const fetchReportList = () => {
        getAllReports(token ? token : "", parseInt(id ? id : ""))
            .then((response) => {
                const { data } = response;
                const reports = data.details.map((report: any) => ({
                    book_id: report.book_id,
                    initial_inventory_amount: report.initial_inventory_amount,
                    final_inventory_amount: report.final_inventory_amount,
                })) as ReportInfo[];
                setReportList(reports);
            })
            .catch((error) => {
                console.error('Error fetching product list:', error);
            });
    };

    return (
        <div className="px-4 py-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">Report Detail</h2>
            </div>

            <table className="w-full border-collapse">
                <thead>
                    <tr className="bg-blue-500 text-white">
                        <th className="py-2 px-4">Book ID</th>
                        <th className="py-2 px-4">Initial amount</th>
                        <th className="py-2 px-4">Final amount</th>
                    </tr>
                </thead>
                <tbody>
                    {reportList.map((report) => (
                        <tr key={report.book_id} className="border-b">
                            <td className="py-2 px-4 text-center">{report.book_id}</td>
                            <td className="py-2 px-4 text-center">{report.initial_inventory_amount}</td>
                            <td className="py-2 px-4 text-center">{report.final_inventory_amount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ViewReportDetail;