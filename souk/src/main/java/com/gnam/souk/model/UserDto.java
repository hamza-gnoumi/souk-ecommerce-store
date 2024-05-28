package com.gnam.souk.model;


public record  UserDto(
        String id,
        String name,
        String email,
        boolean isAdmin
) {

}
