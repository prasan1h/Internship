package com.example.sample1.Service;

import org.springframework.stereotype.Service;

@Service
public class ExampleService {
    public String sum(Double a, Double b){
        Double sum = a + b;
        return "total = "+sum;
    }
}
