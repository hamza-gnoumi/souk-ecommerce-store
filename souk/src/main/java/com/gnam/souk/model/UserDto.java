package com.gnam.souk.model;


import java.util.List;

public record  UserDto(
        String id,
        String name,
        String email,
        boolean isAdmin,
        List<String> roles,
        String username
) {

}
