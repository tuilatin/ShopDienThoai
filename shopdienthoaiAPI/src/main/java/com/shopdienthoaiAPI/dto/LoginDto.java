package com.shopdienthoaiAPI.dto;

public class LoginDto {
    public record Request(String username, String password) {}

    public record Response(String message, UserDto ) {}
}
