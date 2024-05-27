package com.gnam.souk.model;

import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
public class UserDtoMapper implements Function<User,UserDto> {
            @Override
            public UserDto apply(User user){
                return new UserDto(user.getId(), user.getName(), user.getEmail(), user.isAdmin());

    }

}
