package com.gnam.souk.auth;

import com.gnam.souk.exception.RequestValidationException;
import com.gnam.souk.model.User;
import com.gnam.souk.model.UserDto;
import com.gnam.souk.model.UserDtoMapper;
import com.gnam.souk.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthService{

    private final UserService userService;
    private final UserDtoMapper userDtoMapper;



    public UserDto registerUser(User user) {
        userService.addUser(user);
        return userDtoMapper.apply(user);
    }

    public UserDto login(AuthRequest request)  {
        Optional<User> userOptional = userService.selectUserByEmail(request.username());

        if (userOptional.isPresent()) {
            User user = userOptional.get();
            if (user.getPassword().equals(request.password())) {
                return userDtoMapper.apply(user);
            } else {
                throw new RequestValidationException("Invalid username or password");
            }
        } else {
            throw new RequestValidationException("Invalid username or password");
        }

    }


}