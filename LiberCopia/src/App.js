import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {RouterPaths} from "./consts/RouterPaths";
import SignInPage from "./pages/SignInPage/SignInPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import NavBar from "./components/Navbar/NavBar";
import {HomePage} from "./pages/HomePage/HomePage";
import React from 'react';
import CartPage from "./pages/CartPage/CartPage";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

function App() {
    return (
        <Router>
            <div className='layout'>
                <NavBar/>
                <main className='layout__main'>
                    <Routes>
                        <Route path={RouterPaths.SIGN_IN} element={<SignInPage/>}/>
                        <Route path={RouterPaths.SIGN_UP} element={<SignUpPage/>}/>
                        <Route path={RouterPaths.HOME} element={<HomePage/>}/>
                        <Route path={RouterPaths.CART} element={<ProtectedRoute element={<CartPage/>}
                                                                                redirectTo={RouterPaths.SIGN_IN}/>}/>
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;
