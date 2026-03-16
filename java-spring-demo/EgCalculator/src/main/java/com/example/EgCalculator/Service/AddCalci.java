package com.example.EgCalculator.Service;

import org.springframework.stereotype.Service;

@Service
public class AddCalci {
    public String add(Double a, Double b){
        Double sum = a + b;
        return "The sum of " + a + " and " + b + " is " + sum;
    }

}
