import { Routes, Route } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/SideBar';
import AddProductPage from './AddProductPage';
import ViewProductList from './ViewProductList';
import EditProductPage from './EditProductPage';

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
                    </Routes>
                </div>
            </div>
        </div>
    );
};

export default MainPage;