package com.example.demo.model;

import jakarta.persistence.*;

@Entity
@Table(name = "projects")
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    @Column(length = 2000)
    private String description;
    private String tech;
    private String link;
    @Column(length = 100000)
    private String image; // base64

    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getTech() { return tech; }
    public void setTech(String tech) { this.tech = tech; }
    public String getLink() { return link; }
    public void setLink(String link) { this.link = link; }
    public String getImage() { return image; }
    public void setImage(String image) { this.image = image; }
}
