package org.example.backend.controller;

import org.example.backend.model.Conversation;
import org.example.backend.model.NLP_analysis;
import org.example.backend.model.User;
import org.example.backend.repository.ConversationRepository;
import org.example.backend.repository.UserRepository;
import org.example.backend.service.NLP_analysisService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
@RestController
@RequestMapping("/api/nlp")

public class NLP_analysisController {
    @Autowired
    private NLP_analysisService nlpAnalysisService;

    @Autowired
    private UserRepository studentRepository;

    @Autowired
    private ConversationRepository conversationRepository;

    @PostMapping("/analyze")
    public NLP_analysis analyzeText(@RequestBody Map<String, String> requestBody) {
        String text = requestBody.get("text");
        Long studentId = Long.parseLong(requestBody.get("studentId"));
        Long conversationId = Long.parseLong(requestBody.get("conversationId"));

        User student = studentRepository.findById(studentId).orElseThrow(() -> new RuntimeException("Student not found"));
        Conversation conversation = conversationRepository.findById(conversationId).orElseThrow(() -> new RuntimeException("Conversation not found"));

        return nlpAnalysisService.analyzeText(text, student, conversation);
    }
}