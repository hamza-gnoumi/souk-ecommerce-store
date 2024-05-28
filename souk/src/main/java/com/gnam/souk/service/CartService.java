package com.gnam.souk.service;

import com.gnam.souk.exception.NotFoundException;
import com.gnam.souk.model.Cart;
import com.gnam.souk.model.ProductItem;
import com.gnam.souk.repository.CartRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CartService {
    private final CartRepository cartRepository;

    public List<Cart> getAllCarts() {
        return cartRepository.findAll();
    }

    public Cart getCartById(String id) {
        return cartRepository.findById(id).orElse(null);
    }

    public Cart createCart(Cart cart) {
        return cartRepository.save(cart);
    }

    public Cart updateCart(String id, Cart updatedCart) {
        Cart existingCart = getCartById(id);
        if (existingCart == null) {
            throw new NotFoundException("Cart not found with id: " + id);
        }
        updatedCart.setId(id);
        return cartRepository.save(updatedCart);
    }

    public void deleteCart(String id) {
        Cart existingCart = getCartById(id);
        if (existingCart == null) {
            throw new NotFoundException("Cart not found with id: " + id);
        }
        cartRepository.deleteById(id);
    }
    public void deleteCartByUserId(String id){
        cartRepository.deleteByUserId(id);
    }

    public Cart getCartByUserId(String id){
       return cartRepository.findCartByUserId(id);
    }
    public void removeDeletedProductFromCarts(String productId) {
        List<Cart> carts = cartRepository.findAll();
        for (Cart cart : carts) {
            List<ProductItem> updatedCartProducts = cart.getProducts().stream()
                    .filter(cartProduct -> ! cartProduct.productId().equals(productId))
                    .collect(Collectors.toList());
            cart.setProducts(updatedCartProducts);
            cartRepository.save(cart);
        }
    }

}

