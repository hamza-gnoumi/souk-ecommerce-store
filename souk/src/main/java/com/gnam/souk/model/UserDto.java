package com.gnam.souk.model;

import org.springframework.data.mongodb.core.index.Indexed;

public record  UserDto(
        String id,
        String name,
        String email,
        boolean isAdmin
) {

}
