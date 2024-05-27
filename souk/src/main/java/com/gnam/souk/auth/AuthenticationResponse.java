package com.gnam.souk.auth;

import com.gnam.souk.model.UserDto;

public record AuthenticationResponse (
        String token,
        UserDto userDto){
}
