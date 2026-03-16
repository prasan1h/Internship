package com.example.sample1.Service;

import com.example.sample1.Entity.Students;
import com.example.sample1.Repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;

    public Students save(Students student){

        Students s = new Students();
        s.setName(student.getName());
        s.setAge(student.getAge());

        return studentRepository.save(s);
    }

    public List<Students> findAll(){
        return studentRepository.findAll();
    }

    public Optional<Students> findById(Long id){
        return studentRepository.findById(id);
    }

    public Students update(Long id, Students student){
        Students s =  studentRepository.findById(id).orElse(null);

        s.setName(student.getName());
        s.setAge(student.getAge());

        return studentRepository.save(s);
    }

    public void delete(Long id){
        studentRepository.deleteById(id);
    }
}
