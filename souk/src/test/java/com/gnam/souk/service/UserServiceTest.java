package com.gnam.souk.service;

import com.gnam.souk.model.User;
import com.gnam.souk.model.UserDto;
import com.gnam.souk.model.UserDtoMapper;
import com.gnam.souk.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@ExtendWith(MockitoExtension.class)
public class UserServiceTest {

    private UserService underTest;
    @Mock
    private UserRepository userRepository;
    @Mock
    private UserDtoMapper userDtoMapper;

    @BeforeEach
    void setUp(){
        underTest=new UserService(userRepository,userDtoMapper);
    }
@Test
    void canGetUserByEmail(){
        String email="ayoub@domain.com";
    User expected=new User("5454lklm54","hamza", email, "hamza",true);
            Mockito.when(userRepository.findUserByEmail(email))
                    .thenReturn(Optional.of(expected));
    User actual=underTest.selectUserByEmail(email).get();
    assertThat(actual).isEqualTo(expected);
}

}
