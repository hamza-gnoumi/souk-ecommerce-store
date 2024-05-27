package com.gnam.souk.controller;

import com.gnam.souk.model.Category;
import com.gnam.souk.model.Product;
import com.gnam.souk.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService service;

    @PostMapping
    public ResponseEntity<Void>addProduct(@RequestBody Product product){
        service.save(product);
        return new  ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Product>>getProducts(@RequestParam(required = false,name = "category") String categoryId){
        List<Product> products;
        if (categoryId == null) {
            products = service.findAll();
        } else {
            products = service.findByCategory(categoryId);
        }
        return ResponseEntity.ok(products);
    }

    @GetMapping("/{product-id}")
    public ResponseEntity<Product>findById(@PathVariable("product-id") String id){
        return ResponseEntity.ok(service.findById(id));
    }
    @PutMapping("/{product-id}")
    public ResponseEntity<Product> updateProduct(@PathVariable("product-id") String id, @RequestBody Product updatedProduct) {
            Product product = service.updateProduct(id, updatedProduct);
            return ResponseEntity.ok(product);
    }

    @DeleteMapping("/{product-id}")
   public ResponseEntity<Void> delete(@PathVariable("product-id") String id){
        service.delete(id);
        return ResponseEntity.accepted().build();
    }
}
