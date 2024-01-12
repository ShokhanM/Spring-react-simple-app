import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './OrderCreate.css';

const OrderCreate = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const productId = queryParams.get('product_id');
    const productQuantity = parseInt(queryParams.get('product_quantity'), 10);
    const totalPrice = parseFloat(queryParams.get('total_price'));
    const availableQuantity = parseInt(queryParams.get('available_quantity'), 10);

    const [orderConfirmed, setOrderConfirmed] = useState(false);
    const [validationError, setValidationError] = useState(null);

    const validateOrderData = () => {
        if (!productId || isNaN(productQuantity) || isNaN(totalPrice) || productQuantity <= 0 || totalPrice <= 0) {
            setValidationError('Invalid order data. Please check the entered values.');
            return false;
        }

        if (availableQuantity !== null && productQuantity > availableQuantity) {
            setValidationError('Not enough available quantity. Please choose a lower quantity.');
            return false;
        }

        return true;
    };

    const handleConfirmOrder = async () => {
        if (!validateOrderData()) {
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/api/order/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    productId: productId,
                    productQuantity: productQuantity,
                    totalPrice: totalPrice,
                }),
            });

            if (response.ok) {
                setOrderConfirmed(true);
            } else {
                console.error('Error confirming order:', response.statusText);
                setValidationError('Error confirming the order. Please try again later.');
            }
        } catch (error) {
            console.error('Error confirming order:', error);
            setValidationError('Error confirming the order. Please try again later.');
        }
    };

    const handleGoBack = () => {
        navigate(-1);
    };

    const handleGoHome = () => {
        navigate('/');
    };

    return (
        <div className="order-create-container">
            <h1>Create Order</h1>
            <p>Product ID: {productId}</p>
            <p>Product Quantity: {productQuantity}</p>
            <p>Total Price: ${totalPrice}</p>

            {validationError && <p className="error-message">{validationError}</p>}

            {!orderConfirmed && (
                <>
                    <button className="confirm-order-button" onClick={handleConfirmOrder}>
                        Confirm Order
                    </button>
                    <button className="go-back-button" onClick={handleGoBack}>
                        Go Back
                    </button>
                </>
            )}

            {orderConfirmed && (
                <>
                    <p className="order-confirmation-message">Order Confirmed! Thank you for your purchase.</p>
                    <button className="go-home-button" onClick={handleGoHome}>
                        Go to Main Page
                    </button>
                </>
            )}
        </div>
    );
};

export default OrderCreate;
