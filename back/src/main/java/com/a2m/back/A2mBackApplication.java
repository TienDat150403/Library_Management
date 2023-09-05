package com.a2m.back;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
@SpringBootApplication
@EnableCaching
public class A2mBackApplication {
    public static void main(String[] args) {
        SpringApplication.run(A2mBackApplication.class, args);
    }
}
