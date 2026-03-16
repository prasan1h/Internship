package com.example.EgCalculator.Service;

import org.springframework.stereotype.Service;

@Service
public class DivCalci {
    public String div(Double a, Double b){
        Double div = a / b;
        return "The division of " + a + " by " + b + " is " + div;
    }
}
