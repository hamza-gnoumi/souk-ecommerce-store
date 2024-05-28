package com.gnam.souk.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;

@Document(collection = "orders")
@Data
@AllArgsConstructor
@Builder
public class Order {
    @Id
    private String id;
    private String userId;
    private Date orderDate;
    private double totalAmount;
    private List<ProductItem> products;
}