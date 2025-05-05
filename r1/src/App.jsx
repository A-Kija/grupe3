import { BrowserRouter, Routes, Route } from 'react-router';
import './App.css';
import './style/loader.scss';
import Home from './Components/auth/Home';
import Nav from './Components/auth/Nav';
import Login from './Components/auth/Login';
import Logout from './Components/auth/Logout';
import MyProfile from './Components/auth/MyProfile';
import Register from './Components/auth/Register';
import { AuthProvider } from './Components/auth/Auth';

function App() {


    return (
        <BrowserRouter>
            <AuthProvider>
                <Nav />

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="login" element={<Login />} />
                    <Route path="logout" element={<Logout />} />
                    <Route path="my-profile" element={<MyProfile />} />
                    <Route path="register" element={<Register />} />

                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;

