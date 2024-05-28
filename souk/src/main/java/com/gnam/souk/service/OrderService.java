package com.gnam.souk.service;

import com.gnam.souk.exception.NotFoundException;
import com.gnam.souk.model.Order;
import com.gnam.souk.model.ProductItem;
import com.gnam.souk.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderService {


    private final OrderRepository orderRepository;

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public Order getOrderById(String id) {
        return orderRepository.findById(id).orElse(null);
    }

    public Order createOrder(Order order) {
        return orderRepository.save(order);
    }

    public Order updateOrder(String id, Order updatedOrder) {
        Order existingOrder = getOrderById(id);
        if (existingOrder == null) {
            throw new NotFoundException("Order not found with id: " + id);
        }
        updatedOrder.setId(id);
        return orderRepository.save(updatedOrder);
    }

    public void deleteOrder(String id) {
        Order existingOrder = getOrderById(id);
        if (existingOrder == null) {
            throw new NotFoundException("Order not found with id: " + id);
        }
        orderRepository.deleteById(id);
    }

    public List<Order> findOrdersByUserId(String userId) {
        if (!orderRepository.existsByUserId(userId))
            throw new NotFoundException("Order not found with UserId: "+userId);
        return orderRepository.findByUserId(userId);
    }

    public boolean existsOrdersByUserId(String userId) {
        return orderRepository.existsByUserId(userId);
    }

    public void deleteOrdersByUserId(String userId) {
        if (!orderRepository.existsByUserId(userId))
            throw new NotFoundException("Order not found with UserId");
        orderRepository.deleteByUserId(userId);
    }
    public void removeDeletedProductFromOrders(String productId) {
        List<Order> orders = orderRepository.findAll();
        for (Order order : orders) {
            List<ProductItem> updatedOrderProducts = order.getProducts().stream()
                    .filter(orderProduct -> !orderProduct.productId().equals(productId))
                    .collect(Collectors.toList());
            if (!updatedOrderProducts.isEmpty()){
                order.setProducts(updatedOrderProducts);
                orderRepository.save(order);}
            else
                orderRepository.delete(order);
        }
    }
}