package com.gnam.souk.service;

import com.gnam.souk.model.Product;
import lombok.RequiredArgsConstructor;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;

@Service
@RequiredArgsConstructor
public class CategoryProductRelationService {
    private final MongoTemplate mongoTemplate;


    public void updateProductCategoryName(String oldCategoryName, String newCategoryName) {

        Query query = new Query(Criteria.where("categoryName").is(oldCategoryName));

        Update update = new Update().set("categoryName", newCategoryName);
        mongoTemplate.updateMulti(query, update, Product.class);
    }
    public void removeProductsForDeletedCategory(String categoryName) {

        Query query = new Query(Criteria.where("categoryName").is(categoryName));

        mongoTemplate.remove(query, Product.class);
    }
}
