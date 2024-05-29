package com.gnam.souk.service;

import com.gnam.souk.exception.DuplicateResourceException;
import com.gnam.souk.exception.NotFoundException;
import com.gnam.souk.exception.RequestValidationException;
import com.gnam.souk.model.Category;
import com.gnam.souk.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryService {
    private final CategoryRepository repository;
    private final CategoryProductRelationService categoryProductRelationService;

    public void save(Category category){
        if(existsCategoryByName(category.getName()))
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
        if(existsCategoryByName(updatedCategory.getName()))
            throw new DuplicateResourceException("Category Name Already taken: "+category.getName());
        String categoryName = category.getName();
        category.setName(updatedCategory.getName());
        Category updatedCategoryResult = repository.save(category);
        categoryProductRelationService.updateProductCategoryName(categoryName, updatedCategory.getName());

        return updatedCategoryResult;
    }
    public void delete(String id){
        Category category=repository.findById(id)
                .orElseThrow(()->new NotFoundException("Category not found with id: " + id));
        String categoryName = category.getName();
        repository.deleteById(id);
        categoryProductRelationService.removeProductsForDeletedCategory(categoryName);

    }

    public boolean existsCategoryByName(String categoryName){
        return repository.findCategoryByName(categoryName).isPresent();

    }

}
