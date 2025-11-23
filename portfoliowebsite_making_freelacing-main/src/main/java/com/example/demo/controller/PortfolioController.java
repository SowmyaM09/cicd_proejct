package com.example.demo.controller;

import com.example.demo.model.Portfolio;
import com.example.demo.repository.PortfolioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class PortfolioController {
    @Autowired
    private PortfolioRepository portfolioRepository;

    @PostMapping("/portfolio")
    public ResponseEntity<?> createOrUpdatePortfolio(@RequestBody Portfolio portfolio) {
        // Generate a unique URL if not present
        if (portfolio.getUrl() == null || portfolio.getUrl().isEmpty()) {
            String url = "portfolio-" + UUID.randomUUID().toString().substring(0, 8);
            portfolio.setUrl(url);
        }
        Portfolio saved = portfolioRepository.save(portfolio);
        return ResponseEntity.ok().body(java.util.Collections.singletonMap("url", saved.getUrl()));
    }

    @GetMapping("/portfolio/{url}")
    public ResponseEntity<?> getPortfolio(@PathVariable String url) {
        Portfolio portfolio = portfolioRepository.findByUrl(url);
        if (portfolio == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(portfolio);
    }

    @GetMapping("/portfolio/email/{email}")
    public ResponseEntity<?> getPortfolioByEmail(@PathVariable String email) {
        try {
            Portfolio portfolio = portfolioRepository.findByEmail(email);
            if (portfolio == null) return ResponseEntity.notFound().build();
            return ResponseEntity.ok(portfolio);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error: " + e.getMessage());
        }
    }

    @DeleteMapping("/portfolio/{url}")
    public ResponseEntity<?> deletePortfolio(@PathVariable String url) {
        Portfolio portfolio = portfolioRepository.findByUrl(url);
        if (portfolio == null) return ResponseEntity.notFound().build();
        portfolioRepository.delete(portfolio);
        return ResponseEntity.ok().body("Portfolio deleted");
    }
}
