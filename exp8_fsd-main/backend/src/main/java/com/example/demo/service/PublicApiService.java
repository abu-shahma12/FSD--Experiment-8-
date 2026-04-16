package com.example.demo.service;

import com.example.demo.dto.PostDto;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.List;

@Service
public class PublicApiService {

    private final RestClient restClient = RestClient.create();

    public List<PostDto> fetchPosts() {
        return restClient.get()
                .uri("https://jsonplaceholder.typicode.com/posts")
                .retrieve()
                .body(new ParameterizedTypeReference<List<PostDto>>() {});
    }
}
