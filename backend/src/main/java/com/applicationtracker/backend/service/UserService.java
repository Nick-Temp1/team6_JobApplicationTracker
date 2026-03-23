package com.applicationtracker.backend.service;

import com.applicationtracker.backend.dto.UserDTO;
import com.applicationtracker.backend.entity.User;
import com.applicationtracker.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService
{
  @Autowired
  private UserRepository userRepository;

  public UserDTO register(UserDTO userDto)
  {
    if (userRepository.findByUsername(userDto.getUsername()).isPresent())
    {
      throw new RuntimeException("Username already taken");
    }

    User user = new User();
    user.setUsername(userDto.getUsername());
    user.setPassword(userDto.getPassword());
    return toDTO(userRepository.save(user));
  }

  public UserDTO login (UserDTO userDto)
  {
    User user = userRepository.findByUsername(userDto.getUsername()).orElseThrow(() -> new RuntimeException("User Not Found"));

    if(!user.getPassword().equals(userDto.getPassword()))
    {
      throw new RuntimeException("Invalid Password");
    }
    return toDTO(user);
  }

  private UserDTO toDTO(User user)
  {
    UserDTO dto = new UserDTO();
    dto.setId(user.getId());
    dto.setUsername(user.getUsername());

    return dto;
  }


}
