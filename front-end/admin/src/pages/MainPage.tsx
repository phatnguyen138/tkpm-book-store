import { Routes, Route } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/SideBar';
import AddProductPage from './AddProductPage';
import ViewProductList from './ViewProductList';
import EditProductPage from './EditProductPage';
import AddGenre from './AddGenre';
import AddAuthor from './AddAuthor';
import ViewGenresPage from './ViewGenresPage';
import ViewAuthorsPage from './ViewAuthorsPage';
import ViewUserList from './ViewUsersList';
import ViewOrders from './ViewOrder';
import ViewReportPage from './ViewReports';
import AddReportPage from './AddReportPage';
import ViewReportDetail from './ViewReportDetail';

const MainPage: React.FC = () => {
    return (
        <div className="flex flex-col h-screen">
            {/* Header */}
            <Header />

            <div className="flex flex-1">
                {/* Sidebar */}
                <div className="w-64 bg-blue-500 text-white">
                    <Sidebar />
                </div>

                <div className="flex flex-col flex-1">
                    <Routes>
                        <Route path="/add-product" element={<AddProductPage />} />
                        <Route path='/edit-product' element={<ViewProductList/>}/>
                        <Route path='/edit-product/:id' element={<EditProductPage/>}/>
                        <Route path='/add-genre' element={<AddGenre/>}/>
                        <Route path='/add-author' element={<AddAuthor/>}/>
                        <Route path='/edit-genre' element={<ViewGenresPage/>}/>
                        <Route path='/edit-author' element={<ViewAuthorsPage/>}/>
                        <Route path='/view-users' element={<ViewUserList/>}/>
                        <Route path='/view-orders' element={<ViewOrders/>}/>
                        <Route path='/view-reports' element={<ViewReportPage/>}/>
                        <Route path='/add-report' element={<AddReportPage/>}/>
                        <Route path='/report-detail/:id' element={<ViewReportDetail/>}/>
                    </Routes>
                </div>
            </div>
        </div>
    );
};

export default MainPage;