package org.example.backend.model;

import jakarta.persistence.*;


import java.time.LocalDateTime;

@Entity
public class NLP_analysis{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idNLP;

    @ManyToOne
    private User student;

    private Long id;

    public String getFeelings() {
        return feelings;
    }

    public void setFeelings(String feelings) {
        this.feelings = feelings;
    }

    public Long getIdNLP() {
        return idNLP;
    }

    public void setIdNLP(Long idNLP) {
        this.idNLP = idNLP;
    }

    public User getStudent() {
        return student;
    }

    public void setStudent(User student) {
        this.student = student;
    }

    public String getStressLevel() {
        return stressLevel;
    }

    public void setStressLevel(String stressLevel) {
        this.stressLevel = stressLevel;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    private String feelings;
    private String stressLevel;
    private LocalDateTime timestamp;

    public Conversation getConversation() {
        return conversation;
    }

    public void setConversation(Conversation conversation) {
        this.conversation = conversation;
    }

    @ManyToOne
    private Conversation conversation;

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    // Getters et Setters
}