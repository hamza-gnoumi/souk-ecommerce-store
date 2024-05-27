package com.gnam.souk.repository;

import com.gnam.souk.model.Category;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CategoryRepository extends MongoRepository<Category, String> {
    boolean existsCategoryByName(String email);

}
