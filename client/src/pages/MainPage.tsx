import { Routes, Route } from 'react-router-dom';
import HeaderBar from "../components/HeaderBar";
import Footer from "../components/Footer";
import HomePage from './HomePage';
import CartPage from './CartPage';
import {products, onRemoveProductMock} from '../mockData/Products'

function MainPage() : JSX.Element {
    return <div className="page-container">
        <HeaderBar/>
        <Routes>
            <Route path='/' element={<HomePage/>}></Route>
            <Route path='/cart' element={<CartPage products={products} onPay={() => {}} onRemoveProduct={onRemoveProductMock}/>}></Route>
        </Routes>
        <Footer/>
    </div>
}

export default MainPage;