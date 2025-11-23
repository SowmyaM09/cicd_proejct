package com.example.demo.model;

import jakarta.persistence.*;


@Entity
@Table(name = "portfolios")
@org.hibernate.annotations.DynamicUpdate
public class Portfolio {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    // Personal
    private String fullName;
    private String title;
    private String email;
    private String phone;
    private String location;
    @Column(length = 100000)
    private String profilePic; // base64
    @Column(length = 1000)
    private String summary;

    // Social
    private String linkedin;
    private String github;
    private String website;
    private String twitter;

    // Skills
    @Column(length = 1000)
    private String skills;
    @Column(length = 1000)
    private String tools;
    @Column(length = 1000)
    private String softSkills;

    // Education, Experience, Projects, Achievements as JSON
    @Column(columnDefinition = "TEXT")
    private String education; // JSON string
    @Column(columnDefinition = "TEXT")
    private String experience; // JSON string
    @Column(columnDefinition = "TEXT")
    private String projects; // JSON string
    @Column(columnDefinition = "TEXT")
    private String achievements; // JSON string

    // Optional
    @Column(length = 500)
    private String hobbies;
    @Column(length = 500)
    private String languages;

    @Column(unique = true)
    private String url;

    // Getters and setters for all fields
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }
    public String getProfilePic() { return profilePic; }
    public void setProfilePic(String profilePic) { this.profilePic = profilePic; }
    public String getSummary() { return summary; }
    public void setSummary(String summary) { this.summary = summary; }
    public String getLinkedin() { return linkedin; }
    public void setLinkedin(String linkedin) { this.linkedin = linkedin; }
    public String getGithub() { return github; }
    public void setGithub(String github) { this.github = github; }
    public String getWebsite() { return website; }
    public void setWebsite(String website) { this.website = website; }
    public String getTwitter() { return twitter; }
    public void setTwitter(String twitter) { this.twitter = twitter; }
    public String getSkills() { return skills; }
    public void setSkills(String skills) { this.skills = skills; }
    public String getTools() { return tools; }
    public void setTools(String tools) { this.tools = tools; }
    public String getSoftSkills() { return softSkills; }
    public void setSoftSkills(String softSkills) { this.softSkills = softSkills; }
    public String getEducation() { return education; }
    public void setEducation(String education) { this.education = education; }
    public String getExperience() { return experience; }
    public void setExperience(String experience) { this.experience = experience; }
    public String getProjects() { return projects; }
    public void setProjects(String projects) { this.projects = projects; }
    public String getAchievements() { return achievements; }
    public void setAchievements(String achievements) { this.achievements = achievements; }
    public String getHobbies() { return hobbies; }
    public void setHobbies(String hobbies) { this.hobbies = hobbies; }
    public String getLanguages() { return languages; }
    public void setLanguages(String languages) { this.languages = languages; }
    public String getUrl() { return url; }
    public void setUrl(String url) { this.url = url; }
}
