package com.gnam.souk.service;

import com.gnam.souk.exception.DuplicateResourceException;
import com.gnam.souk.exception.NotFoundException;
import com.gnam.souk.exception.RequestValidationException;
import com.gnam.souk.model.User;
import com.gnam.souk.model.UserDto;
import com.gnam.souk.model.UserDtoMapper;
import com.gnam.souk.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final UserDtoMapper userDtoMapper;
    private final PasswordEncoder passwordEncoder;

    public void addUser(User user){
        if(userRepository.existsUserByEmail(user.getEmail()))
            throw new DuplicateResourceException("Email Already taken: "+user.getEmail());
        String passwordEncoded=passwordEncoder.encode(user.getEmail());
        user.setPassword(passwordEncoded);
        userRepository.save(user);
    }
    public List<UserDto> findAll(){
       return userRepository.findAll().stream()
                .map(userDtoMapper)
                .collect(Collectors.toList());
    }
    public UserDto findById(String id){
        return userRepository.findById(id)
                .map(userDtoMapper)
                .orElseThrow(()->new NotFoundException("User not found with id: "+id ));
    }
    public User updateUser(String id, User updatedUser){
       User user= userRepository.findById(id)
                .orElseThrow(()->new NotFoundException("User not found with id: "+id ));
       boolean changes=false;
       if(updatedUser.getName()!=null&& !updatedUser.getName().equals(user.getName())){
           user.setName(updatedUser.getName());
           changes=true;
       }
        if(updatedUser.getEmail()!=null&& !updatedUser.getEmail().equals(user.getEmail()) && !userRepository.existsUserByEmail(updatedUser.getEmail())){
            user.setEmail(updatedUser.getEmail());
            changes=true;
        }
        if( updatedUser.isAdmin()!=user.isAdmin()){
            user.setAdmin(updatedUser.isAdmin());
            changes=true;
        }
        if (!changes){
            throw new RequestValidationException("No Data Changes Found");
        }
       return userRepository.save(user);
    }

    public void deleteUser(String id){
        userRepository.findById(id)
                .orElseThrow(()->new NotFoundException("User not found with id: "+id ));
        userRepository.deleteById(id);
    }

    public Optional<User> selectUserByEmail(String email) {
        return userRepository.findUserByEmail(email);
    }

}
