import { BrowserRouter, Routes, Route } from 'react-router';
import './App.css';
import './style/loader.scss';
import Home from './Components/auth/Home';
import Nav from './Components/auth/Nav';
import Login from './Components/auth/Login';
import MyProfile from './Components/auth/MyProfile';
import Register from './Components/auth/Register';

function App() {


    return (
        <BrowserRouter>
            <Nav />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="login" element={<Login />} />
                <Route path="my-profile" element={<MyProfile />} />
                <Route path="register" element={<Register />} />

            </Routes>
        </BrowserRouter>
    );
}

export default App;

