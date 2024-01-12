package com.example.app.service.impl;

import com.example.app.model.Order;
import com.example.app.repository.OrderRepository;
import com.example.app.repository.ProductRepository;
import com.example.app.service.OrderService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;
    @Override
    @Transactional
    public void createOrder(Order order) {
        decreaseAvailableProductQuantity(order.getProductId(), order.getProductQuantity());
        orderRepository.save(order);
    }

    private void decreaseAvailableProductQuantity(Long productId, Long orderedQuantity) {
        var product = productRepository.findById(productId).get();
        var currentQuantity = product.getAvailableQuantity();
        product.setAvailableQuantity(currentQuantity-orderedQuantity);
        productRepository.save(product);
    }

    @Override
    public List<Order> getOrders() {
        return orderRepository.findAll();
    }
}
