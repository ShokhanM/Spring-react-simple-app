// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductList from './component/ProductList';
import ProductDetail from './component/ProductDetail';
import OrderCreate from './component/OrderCreate';
import './App.css'; // Import the CSS file

const App = () => {
    return (
        <Router>
            <div className="container">
                <Routes>
                    <Route path="/product/:id" element={<ProductDetail />} />
                    <Route path="/order/create" element={<OrderCreate />} />
                    <Route path="/" element={<ProductList />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
