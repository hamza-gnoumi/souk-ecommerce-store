package com.gnam.souk.service;

import com.gnam.souk.exception.DuplicateResourceException;
import com.gnam.souk.exception.NotFoundException;
import com.gnam.souk.exception.RequestValidationException;
import com.gnam.souk.model.Category;
import com.gnam.souk.model.Category;
import com.gnam.souk.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CategoryService {
    private final CategoryRepository repository;

    public void save(Category category){
        if(repository.existsCategoryByName(category.getName()))
            throw new DuplicateResourceException("Category Name Already taken: "+category.getName());
        repository.save(category);
    }
    public List<Category>findAll(){
       return repository.findAll();
    }
    public Category findById(String id){
        return repository.findById(id)
                .orElseThrow(()->new NotFoundException("Category not found with id: " + id));
    }
    public Category updateCategory(String id,Category updatedCategory){
        Category category=repository.findById(id)
                .orElseThrow(()->new NotFoundException("Category not found with id: " + id));
        if (updatedCategory.getName()==null || updatedCategory.getName().equals(category.getName()))
            throw new RequestValidationException("No Data Changes Found");
        if(repository.existsCategoryByName(category.getName()))
            throw new DuplicateResourceException("Category Name Already taken: "+category.getName());
        category.setName(updatedCategory.getName());
        return repository.save(category);
    }
    public void delete(String id){
        Category category=repository.findById(id)
                .orElseThrow(()->new NotFoundException("Category not found with id: " + id));
        repository.deleteById(id);
    }

    public boolean existsCategoryByName(String categoryName){
        return repository.existsCategoryByName(categoryName);
    }

}
