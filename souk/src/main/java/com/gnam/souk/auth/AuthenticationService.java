package com.gnam.souk.auth;

import com.gnam.souk.exception.NotFoundException;
import com.gnam.souk.jwt.JwtUtil;
import com.gnam.souk.model.User;
import com.gnam.souk.model.UserDto;
import com.gnam.souk.model.UserDtoMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final AuthenticationManager authenticationManager;
    private final UserDtoMapper userDtoMapper;
    private final JwtUtil jwtUtil;



    public AuthenticationResponse login(AuthenticationRequest request) {
        UsernamePasswordAuthenticationToken authenticationToken=new UsernamePasswordAuthenticationToken(
                request.username(),
                request.password()
        );
        Authentication authentication = authenticationManager.authenticate(
                authenticationToken
        );

        User principal = (User) authentication.getPrincipal();
        System.out.println(principal);
        UserDto userDto = userDtoMapper.apply(principal);
        String token = jwtUtil.generateToken(userDto.email(), userDto.isAdmin());
        return new AuthenticationResponse(token, userDto);
    }

}