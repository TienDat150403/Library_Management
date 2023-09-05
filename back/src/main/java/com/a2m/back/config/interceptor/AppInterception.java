package com.a2m.back.config.interceptor;

import com.a2m.back.config.interceptor.handle.RoleInterception;
import com.a2m.back.constant.SecurityConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Author tiennd
 * Created date 2023-07-15
 */

@Configuration
public class AppInterception implements WebMvcConfigurer {

//    @Autowired
//    private RoleInterception roleInterception;
//
//    @Override
//    public void addInterceptors(InterceptorRegistry registry) {
//        String publicApi = String.join(",", SecurityConstants.PUBLIC_MATCHING_API);
//        registry.addInterceptor(roleInterception)
//                .excludePathPatterns(
//                        publicApi,
//                        "/api/**/*.exclude"
//                );
//    }

}
