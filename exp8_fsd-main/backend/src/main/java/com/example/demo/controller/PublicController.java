package com.example.demo.controller;

import com.example.demo.dto.PostDto;
import com.example.demo.service.PublicApiService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/public")
public class PublicController {

    private final PublicApiService publicApiService;

    public PublicController(PublicApiService publicApiService) {
        this.publicApiService = publicApiService;
    }

    @GetMapping("/posts")
    public List<PostDto> getPosts() {
        return publicApiService.fetchPosts();
    }
}
