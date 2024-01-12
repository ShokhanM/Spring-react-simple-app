package com.example.app.service;


import com.example.app.model.Order;

import java.util.List;

public interface OrderService {
    void createOrder(Order order);

    List<Order> getOrders();
}
