package com.example.EgCalculator.Service;

import org.springframework.stereotype.Service;

@Service
public class SubCalci {
    public String sub(Double a, Double b){
        Double sub = a - b;
        return "The difference between " + a + " and " + b + " is " + sub;
    }
}
