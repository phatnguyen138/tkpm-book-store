import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Report } from '../types/Report';
import { getReportList} from '../lib/axios/Report';

const ViewReportPage: React.FC = () => {
    const token = localStorage.getItem('access_token') ? localStorage.getItem('access_token') : "";
    const [reportList, setReportList] = useState<Report[]>([]);

    useEffect(() => {
        fetchReportList();
    }, []);

    const fetchReportList = () => {
        getReportList(token ? token : "")
            .then((response) => {
                const { data } = response;
                const reports = data.reports.map((report: any) => ({
                    inventory_id: report.inventory_id,
                    report_date: report.report_date,
                    note: report.note,
                    email: report.user.email
                })) as Report[];
                setReportList(reports);
            })
            .catch((error) => {
                console.error('Error fetching product list:', error);
            });
    };

    return (
        <div className="px-4 py-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">Book List</h2>
                <Link to="/add-report" className="bg-blue-500 text-white py-2 px-4 rounded">
                    Create Report
                </Link>
            </div>

            <table className="w-full border-collapse">
                <thead>
                    <tr className="bg-blue-500 text-white">
                        <th className="py-2 px-4">ID</th>
                        <th className="py-2 px-4">Report Date</th>
                        <th className="py-2 px-4">Note</th>
                        <th className="py-2 px-4">Creator ID</th>
                        <th className="py-2 px-4">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {reportList.map((report) => (
                        <tr key={report.inventory_id} className="border-b">
                            <td className="py-2 px-4 text-center">{report.inventory_id}</td>
                            <td className="py-2 px-4 text-center">{report.report_date}</td>
                            <td className="py-2 px-4 text-center">{report.note}</td>
                            <td className="py-2 px-4 text-center">{report.note}</td>
                            <td className="py-2 px-4 text-center">
                                <div className="space-x-2">
                                    <Link
                                        to={`/report-detail/${report.inventory_id}`}
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
};

export default ViewReportPage;