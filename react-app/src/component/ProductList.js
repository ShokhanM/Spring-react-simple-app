// ProductList.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ProductList.css'; // Import the CSS file

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({
        name: '',
        price: '',
        availableQuantity: ''
        // Add other properties as needed
    });

    useEffect(() => {
        // Fetch the list of products from the server
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/product');
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value,
        }));
    };

    const handleAddProduct = async (e) => {
        e.preventDefault();

        try {
            // Send a POST request to add a new product
            const response = await fetch('http://localhost:8080/api/product', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newProduct),
            });

            if (response.ok) {
                // If the request is successful, update the product list
                const addedProduct = await response.json();
                setProducts((prevProducts) => [...prevProducts, addedProduct]);

                // Clear the form fields
                setNewProduct({
                    name: '',
                    price: '',
                    availableQuantity: ''
                    // Add other properties as needed
                });
            } else {
                console.error('Error adding product:', response.statusText);
            }
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    return (
        <div className="product-list-container">
            <h1 className="product-list-header">Product List</h1>

            {/* Product List */}
            <div className="product-grid">
                {products.map((product) => (
                    <div key={product.id} className="product-cell">
                        <Link to={`/product/${product.id}`} className="product-link">
                            <h3>{product.name}</h3>
                            <p>Price: ${product.price}</p>
                            <p>Available quantity: {product.availableQuantity}</p>
                        </Link>
                    </div>
                ))}
            </div>

            {/* Add Product Form */}
            <form className="product-form" onSubmit={handleAddProduct}>
                <h2>Add New Product</h2>
                <label>
                    Name:
                    <input type="text" name="name" value={newProduct.name} onChange={handleInputChange} required />
                </label>
                <label>
                    Price:
                    <input type="number" name="price" value={newProduct.price} onChange={handleInputChange} required />
                </label>
                <label>
                    Available quantity:
                    <input type="number" name="availableQuantity" value={newProduct.availableQuantity} onChange={handleInputChange} required />
                </label>
                {/* Add other input fields as needed */}

                <button type="submit" className="add-product-button">Add Product</button>
            </form>
        </div>
    );
};

export default ProductList;
