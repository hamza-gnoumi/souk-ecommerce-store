package com.gnam.souk.repository;

import com.gnam.souk.model.Category;
import com.gnam.souk.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface CategoryRepository extends MongoRepository<Category, String> {
    Optional<Category> findCategoryByName(String name);
}
