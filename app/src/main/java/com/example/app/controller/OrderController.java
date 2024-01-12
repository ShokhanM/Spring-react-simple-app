package com.example.app.controller;


import com.example.app.model.Order;
import com.example.app.model.Product;
import com.example.app.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/order")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @PostMapping("/create")
    public void create(@RequestBody Order order){
        orderService.createOrder(order);
    }

}
