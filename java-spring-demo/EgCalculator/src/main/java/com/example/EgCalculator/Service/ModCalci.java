package com.example.EgCalculator.Service;

import org.springframework.stereotype.Service;

@Service
public class ModCalci {
    public String mod(Double a, Double b){
        if(b == 0){
            return "null val cannot be modulused";
        }
        else{
            int mod = (int)Math.round(a) % (int)Math.round(b);
            return "Modulus of " + a + " and " + b + " is " + mod;
        }
    }
}
