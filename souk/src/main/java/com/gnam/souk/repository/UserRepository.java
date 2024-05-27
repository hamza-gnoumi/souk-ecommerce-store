package com.gnam.souk.repository;

import com.gnam.souk.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface UserRepository extends MongoRepository<User,String> {

    boolean existsUserByEmail(String email);

    boolean existsUserById(Long id);

    Optional<User> findUserByEmail(String email);
}
