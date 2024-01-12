import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ProductDetail.css';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/product/${id}`);
                const data = await response.json();
                setProduct(data);
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        };

        fetchProduct();
    }, [id]);

    const handleCreateOrder = async () => {
        try {
            const totalPrice = product.price * quantity;
            navigate(`/order/create?product_id=${id}&product_name=${product.name}&available_quantity=${product.availableQuantity}&product_quantity=${quantity}&total_price=${totalPrice}`);
        } catch (error) {
            console.error('Error creating order:', error);
        }
    };

    if (!product) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className="product-detail-container">
            <h1 className="product-detail-title">{product.name}</h1>
            <p className="product-detail-price">Price: ${product.price}</p>
            <p className="product-detail-quantity">Available quantity: {product.availableQuantity}</p>
            <p className="product-detail-quantity">
                Quantity:
                <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value, 10)))}
                />
            </p>
            <button className="create-order-button" onClick={handleCreateOrder}>Create Order</button>
        </div>
    );
};

export default ProductDetail;
