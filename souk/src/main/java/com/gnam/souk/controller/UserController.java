package com.gnam.souk.controller;

import com.gnam.souk.model.User;
import com.gnam.souk.model.UserDto;
import com.gnam.souk.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping
    public ResponseEntity<List<UserDto>>findAll(){
        return ResponseEntity.ok(userService.findAll());
    }
    @GetMapping("/{user-id}")
    public ResponseEntity<UserDto>findById(@PathVariable("user-id")String id){
        return ResponseEntity.ok(userService.findById(id));
    }
    @PostMapping
    public ResponseEntity<Void>addUser(@RequestBody User user){
        userService.addUser(user);
        return new  ResponseEntity<>(HttpStatus.CREATED);
    }
    @PutMapping("/{user-id}")
    public ResponseEntity<User>updateUser(@PathVariable("user-id")String id,@RequestBody User updateUser){
        return ResponseEntity.ok(userService.updateUser(id, updateUser));
    }
    @DeleteMapping("/{user-id}")
    public ResponseEntity<Void>deleteUser(@PathVariable("user-id")String id){
        userService.deleteUser(id);
        return  ResponseEntity.accepted().build();
    }
}
