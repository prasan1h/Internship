package com.example.EgCalculator.Service;

import org.springframework.stereotype.Service;

@Service
public class MultiCalci {
    public String multi(Double a, Double b){
        Double multi = a * b;
        return "The product of " + a + " and " + b + " is " + multi;
    }
}
