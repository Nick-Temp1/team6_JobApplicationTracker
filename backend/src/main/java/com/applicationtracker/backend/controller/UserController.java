package com.applicationtracker.backend.controller;

import com.applicationtracker.backend.dto.UserDTO;
import com.applicationtracker.backend.entity.User;
import com.applicationtracker.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController
{
  @Autowired
  private UserService userService;

  @PostMapping("/register")
  public ResponseEntity<?> register(@RequestBody UserDTO userDto)
  {
    try {
      User user = userService.register(userDto);
      return ResponseEntity.ok(user);
    } catch (RuntimeException e)
    {
      return ResponseEntity.badRequest().body(e.getMessage());
    }
  }

  @PostMapping("/login")
  public ResponseEntity<?> login(@RequestBody UserDTO userDto)
  {
    try {
      User user = userService.login(userDto);
      return ResponseEntity.ok(user);
    } catch (RuntimeException e)
    {
      return ResponseEntity.status(401).body(e.getMessage());
    }
  }
}
