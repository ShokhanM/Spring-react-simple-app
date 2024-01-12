package com.example.app.service;

import com.example.app.model.Product;

import java.util.List;

public interface ProductService {

    Product getProductById(Long id);

    List<Product> getProducts();

    void createProduct(Product product);
}
