import { Routes, Route } from 'react-router-dom';
import HeaderBar from "../components/HeaderBar";
import Footer from "../components/Footer";
import HomePage from './HomePage';
import CartPage from './CartPage';
import BookListPage from './BookListPage';
import ProductDetail from './ProductDetail';
import Checkout from './Checkout';
import Profile from './Profile';
import ProfileEdit from './EditProfile';
import SearchPage from './SearchPage';



function MainPage() : JSX.Element {
    return <div className="page-container">
        <HeaderBar/>
        <Routes>
            <Route path='/' element={<HomePage/>}></Route>
            <Route path='/cart' element={<CartPage/>}></Route>
            <Route path="/list/:type/:page?" element={<BookListPage />} />
            <Route path="/search/:keyword/:page?" element={<SearchPage />} />
            <Route path='/product/:id' element={<ProductDetail/>}/>
            <Route path='/checkout' element={<Checkout/>}/>
            <Route path='/profile' element={<Profile/>}/>
            <Route path='/profile/edit' element={<ProfileEdit/>}/>
        </Routes>
        <Footer/>
    </div>
}

export default MainPage;