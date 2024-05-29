package com.gnam.souk;

import com.gnam.souk.model.Product;
import com.gnam.souk.service.CategoryService;
import com.gnam.souk.service.ProductService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class SoukApplication {

	public static void main(String[] args) {
		SpringApplication.run(SoukApplication.class, args);
	}

	@Bean
	public CommandLineRunner runner(ProductService productService, CategoryService categoryService){
		return args -> {
			var product = Product.builder()
					.name("plateau")
					.description("40cm martele")
					.price(80)
					.stock(15)
					.img("https://images.pexels.com/photos/563067/pexels-photo-563067.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")
					.categoryName("plateaux")
					.build();
			productService.save(product);
		/*	var category= Category.builder()
					.name("plateaux")
					.build();
			categoryService.save(category);*/

		};
	}

}
