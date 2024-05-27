package com.gnam.souk.controller;

import com.gnam.souk.model.Category;
import com.gnam.souk.model.Product;
import com.gnam.souk.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/categories")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService service;
    @PostMapping
    public ResponseEntity<Void>addCategory(@RequestBody Category category){
         service.save(category);
        return new  ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Category>> getAllCategories(){
        return ResponseEntity.ok(service.findAll());
    }


    @GetMapping("/{category-id}")
    public ResponseEntity<Category>findCategoryById(@PathVariable("category-id")String id){
        return ResponseEntity.ok(service.findById(id));
    }
    @PutMapping("/{category-id}")
    public ResponseEntity<Category>updateCategory(@PathVariable("category-id")String id,@RequestBody Category updatedCategory){
        return ResponseEntity.ok(service.updateCategory(id, updatedCategory));
    }
    @DeleteMapping("/{category-id}")
    public ResponseEntity<Void>deteteCategory(@PathVariable("category-id")String id){
        service.delete(id);
        return ResponseEntity.accepted().build();
    }
}
