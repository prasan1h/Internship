package com.example.sample1.Controller;

import com.example.sample1.Entity.Students;
import com.example.sample1.Service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:5173/")
public class StudentController {

    @Autowired StudentService studentService;

    @PostMapping("/save")
    public Students save(@RequestBody Students student){
        return studentService.save(student);
    }

    @GetMapping("/all")
    public List<Students> findALl(){
        return studentService.findAll();
    }

    @GetMapping("/find/{id}")
    public Optional<Students> findById(@PathVariable Long id){
        return studentService.findById(id);
    }

    @PutMapping("/put/{id}")
    public Students update(@PathVariable Long id,@RequestBody Students student){
        return studentService.update(id, student);
    }

    @DeleteMapping("/del/{id}")
    public void delete(@PathVariable Long id){
        studentService.delete(id);
    }
}
