package com.example.demo.controller;

import com.example.demo.model.Blog;
import com.example.demo.repository.BlogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/blogs")
@CrossOrigin(origins = "http://localhost:5173")
public class BlogController {
    @Autowired
    private BlogRepository blogRepository;

    @GetMapping
    public List<Blog> getAllBlogs() {
        return blogRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<?> addBlog(@RequestBody Blog blog) {
        Blog saved = blogRepository.save(blog);
        return ResponseEntity.ok(saved);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteBlog(@PathVariable Long id) {
        if (!blogRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        blogRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
