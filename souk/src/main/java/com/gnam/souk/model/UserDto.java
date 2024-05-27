package com.gnam.souk.model;

import org.springframework.data.mongodb.core.index.Indexed;

import java.util.List;

public record  UserDto(
        String id,
        String name,
        String email,
        List<String> roles,
        boolean isAdmin
) {

}
