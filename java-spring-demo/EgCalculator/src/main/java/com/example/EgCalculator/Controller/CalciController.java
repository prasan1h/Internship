package com.example.EgCalculator.Controller;

import com.example.EgCalculator.Service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CalciController {

    @Autowired AddCalci addService;
    @Autowired SubCalci subService;
    @Autowired MultiCalci multiService;
    @Autowired DivCalci divService;
    @Autowired ModCalci modService;

    @GetMapping("/add")
    public String addDouble(@RequestParam Double a, @RequestParam Double b){
        return addService.add(a,b);
    }

    @GetMapping("/sub")
    public String sub(@RequestParam Double a, @RequestParam Double b){
        return subService.sub(a,b);
    }

    @GetMapping("/multi")
    public String multi(@RequestParam Double a, @RequestParam Double b){
        return multiService.multi(a,b);
    }

    @GetMapping("/div")
    public String div(@RequestParam Double a, @RequestParam Double b){
        return divService.div(a,b);
    }

    @GetMapping("/mod")
    public String mod(@RequestParam Double a, @RequestParam Double b){
        return modService.mod(a,b);
    }
}
