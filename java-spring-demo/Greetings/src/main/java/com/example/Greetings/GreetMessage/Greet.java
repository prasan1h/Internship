package com.example.Greetings.GreetMessage;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Greet {
    @GetMapping("/hi")
    public String greet(){
        return "HI, THIS IS BACKEND";
    }

    @GetMapping("/hello")
    public String hello(){
        return "HELLO FROM BACKEND";
    }

    @GetMapping("/error")
    public String error(){
        return "Error Occurred";
    }
}
