import "./index.css"
import { Routes, Route } from 'react-router-dom';
import LoginForm from "./components/LoginForm"
import RegisterForm from "./components/RegisterForm";
import ProtectedRoute from './components/ProtectedRoute';
import MainPage from "./pages/MainPage";

function App() {
  const isLoggedIn = !!localStorage.getItem('access_token'); // or however you check if the user is logged in

  return (
    <Routes>
      <Route path="/*" element={<ProtectedRoute isLoggedIn={isLoggedIn} children={<MainPage />} />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />
    </Routes>
  )
}

export default App