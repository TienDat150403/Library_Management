package com.a2m.back.constant;

/**
 * Author tiennd
 * Created date 2023-07-08
 */
public class SecurityConstants {
    public static final String TOKEN_PREFIX = "Bearer ";
    public static final String HEADER_STRING = "Authorization";
    public static final String ACCESS_TOKEN = "access_token";
    public static final String[] PUBLIC_MATCHING_API = {
            "/api/public/**",
    };

//    public static final String[] ROLE_NORMAL_MATCHING_API = {
//            "/api/normal/**",
//    };

    
    public static final String[] ROLE_NORMAL_MATCHING_API = {
            "/api/user/**",
    };
    
    public static final String[] ROLE_ADMIN_MATCHING_API = {
            "/api/admin/**",
    };
}
