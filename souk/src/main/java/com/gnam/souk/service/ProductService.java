package com.gnam.souk.service;

import com.gnam.souk.exception.NotFoundException;
import com.gnam.souk.exception.RequestValidationException;
import com.gnam.souk.model.Product;
import lombok.RequiredArgsConstructor;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final MongoTemplate mongoTemplate;
    private final CategoryService categoryService;
    private final CartService cartService;
    private final OrderService orderService;


    public void save(Product product){
        if(! categoryService.existsCategoryByName(product.getCategoryName()))
            throw  new NotFoundException("Category not found with name: " + product.getCategoryName());
        mongoTemplate.save(product);
    }
    public Product findById(String id){
        Product product=mongoTemplate.findById(id, Product.class);
        if (product==null)
            throw new NotFoundException("Product not found with id: " + id);
        return product;

    }

   public List<Product> findAll() {
       return mongoTemplate.findAll(Product.class);
   }

   public List<Product>findByCategory(String categoryName){
        if(! categoryService.existsCategoryByName(categoryName))
            throw  new NotFoundException("Category not found with name: " + categoryName);
        Query query=new Query(Criteria.where("categoryName").is(categoryName));
        return mongoTemplate.find(query, Product.class);
   }

    public Product updateProduct(String id, Product updatedProduct) {
        Product product = mongoTemplate.findById(id, Product.class);
        if (product == null)
            throw new NotFoundException("Product not found with id: " + id);
        boolean changes=false;

        if(updatedProduct.getName()!=null &&
                !updatedProduct.getName().equals(product.getName())){
            product.setName(updatedProduct.getName());
            changes=true;
        }
        if(updatedProduct.getStock()>=0 &&
                updatedProduct.getStock()!=(product.getStock())){
            product.setStock(updatedProduct.getStock());
            changes=true;
        }
        if(updatedProduct.getDescription()!=null &&
                !updatedProduct.getDescription().equals(product.getDescription())){
            product.setDescription(updatedProduct.getDescription());
            changes=true;
        }
        if(updatedProduct.getPrice()>0 &&
                updatedProduct.getPrice()!=(product.getPrice())){
            product.setPrice(updatedProduct.getPrice());
            changes=true;
        }
        if(updatedProduct.getImg()!=null &&
                !updatedProduct.getImg().equals(product.getImg())){
            product.setImg(updatedProduct.getImg());
            changes=true;
        }
        if (updatedProduct.getCategoryName()!=null && !updatedProduct.getCategoryName().equals(product.getCategoryName())){
            if(! categoryService.existsCategoryByName(updatedProduct.getCategoryName()))
                throw  new NotFoundException("Category not found with name: " + updatedProduct.getCategoryName());
            product.setCategoryName(updatedProduct.getCategoryName());
            changes=true;
        }


        if (!changes){
            throw new RequestValidationException("No Data Changes Found");
        }
        return mongoTemplate.save(product);


    }

        public void delete(String id) {
        Product product=mongoTemplate.findById(id,  Product.class);
            if(product==null)
                throw new NotFoundException("Product not found with id: " + id);
            mongoTemplate.remove(product);
            cartService.removeDeletedProductFromCarts(id);
            orderService.removeDeletedProductFromOrders(id);
        }



    public void updateCategoryNameOfProduct(String id, String updatedCategoryName) {
        if( categoryService.findById(id)==null)
            throw  new NotFoundException("Category not found with name: " + id);

        Query query=new Query(Criteria.where("categoryName").is(categoryService.findById(id).getName()));
        Update update =new Update().set("categoryName", updatedCategoryName);
        mongoTemplate.findAndModify(query, update, Product.class);


    }
}


