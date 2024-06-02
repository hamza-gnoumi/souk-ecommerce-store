package com.gnam.souk.auth;

import com.gnam.souk.exception.RequestValidationException;
import com.gnam.souk.jwt.JwtUtil;
import com.gnam.souk.model.User;
import com.gnam.souk.model.UserDto;
import com.gnam.souk.model.UserDtoMapper;
import com.gnam.souk.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthService{

    private final UserService userService;
    private final UserDtoMapper userDtoMapper;
    private final PasswordEncoder passwordEncoder;

    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;



    public AuthResponse login(AuthRequest request)  {

            UsernamePasswordAuthenticationToken authenticationToken=new UsernamePasswordAuthenticationToken(
                    request.username(),
                    request.password()
            );
            Authentication authentication = authenticationManager.authenticate(
                    authenticationToken
            );
            User principal = (User) authentication.getPrincipal();
            UserDto userDto = userDtoMapper.apply(principal);
            String token = jwtUtil.issueToken(userDto.username(), userDto.roles());
            return new AuthResponse(token, userDto);
        }




}