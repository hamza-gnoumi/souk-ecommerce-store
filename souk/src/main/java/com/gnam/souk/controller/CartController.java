package com.gnam.souk.controller;

import com.gnam.souk.model.Cart;
import com.gnam.souk.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/carts")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;

    @GetMapping
    public ResponseEntity<List<Cart>> getAllCarts() {
        List<Cart> carts = cartService.getAllCarts();
        return ResponseEntity.ok(carts);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Cart> getCartById(@PathVariable String id) {
        Cart cart = cartService.getCartById(id);
        if (cart == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(cart);
    }
    @GetMapping("/user/{user-id}")
    public ResponseEntity<Cart> getCartByUserId(@PathVariable("user-id") String id) {
        Cart cart = cartService.getCartByUserId(id);
        if (cart == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(cart);
    }

    @PostMapping
    public ResponseEntity<Cart> createCart(@RequestBody Cart cart) {
        Cart createdCart = cartService.createCart(cart);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdCart);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Cart> updateCart(@PathVariable String id, @RequestBody Cart updatedCart) {
        try {
            Cart cart = cartService.updateCart(id, updatedCart);
            return ResponseEntity.ok(cart);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCart(@PathVariable String id) {
        try {
            cartService.deleteCart(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    @DeleteMapping("/user/{user-id}")
    public ResponseEntity<Void> deleteCartByUserId(@PathVariable("user-id") String id) {
        try {
            cartService.deleteCartByUserId(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}