package com.gnam.souk.auth;

public record AuthenticationRequest(
        String username,
        String password
) {
}
