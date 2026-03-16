package com.example.sample1.Controller;

import com.example.sample1.DTO.LoginRequest;
import com.example.sample1.Service.ExampleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class hello {

    @Autowired
    private ExampleService service;

    @GetMapping("/hi")
    public String hello(){
        return "Hello there";
    }

    @GetMapping("/hi/{name}")
    public String helloName(@PathVariable String name){
        return "hi " + name;
    }

    @GetMapping("/login")
    public String login(@RequestParam String name, @RequestParam String password){
        return "welcome " + name;
    }

    @PostMapping("/login2")
    public String login2(@RequestBody LoginRequest request){
        return "welcome by post  " + request.getUsername()   ;
    }

    @GetMapping("/login2")
    public String login3(@RequestBody LoginRequest request){
        return "welcome by get  " + request.getUsername()   ;
    }

    @GetMapping("/sum")
    public String sum(@RequestParam Double a, @RequestParam Double b){
        return service.sum(a,b);
    }
}
