package com.gnam.souk.repository;

import com.gnam.souk.model.Cart;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CartRepository extends MongoRepository<Cart, String> {
    void deleteByUserId(String id);
    Cart findCartByUserId(String id);
}
