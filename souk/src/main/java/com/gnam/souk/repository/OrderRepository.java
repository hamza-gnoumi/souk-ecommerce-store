package com.gnam.souk.repository;

import com.gnam.souk.model.Order;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends MongoRepository<Order, String> {
    List<Order> findByUserId(String userId);
    boolean existsByUserId(String userId);
    void deleteByUserId(String userId);
}
