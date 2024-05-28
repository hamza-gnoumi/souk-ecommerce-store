package com.gnam.souk.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "carts")
@Data
@AllArgsConstructor
@Builder
public class Cart {
    @Id
    private String id;
    private String userId;
    private List<ProductItem> products;
}
