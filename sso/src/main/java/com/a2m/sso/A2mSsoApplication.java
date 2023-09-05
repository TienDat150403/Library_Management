package com.a2m.sso;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class A2mSsoApplication {

    public static void main(String[] args) {
        SpringApplication.run(A2mSsoApplication.class, args);
    }

}
