package com.a2m.sso.util;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Author tiennd
 * Created date 2023-07-08
 */
public class CookieUtils {

    private static final int MAX_AGE = 8 * 3600;

    public static void addCookie(HttpServletResponse response, String name, String value) {
        Cookie cookie = new Cookie(name, value);
        cookie.setHttpOnly(true);
        cookie.setMaxAge(MAX_AGE);
        cookie.setPath("/");
        response.addCookie(cookie);
    }

    public static String getCookieByName(String name, HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        if(cookies == null) {
            return null;
        }
        for (int i = 0; i < cookies.length; i++) {
            Cookie cookie = cookies[i];
            if(name.equals(cookie.getName())) {
                return cookie.getValue();
            }
        }
        return null;
    }

    public static Cookie deleteCookieByName(String name, HttpServletRequest request, HttpServletResponse resp) {
        Cookie[] cookies = request.getCookies();
        if(cookies == null) {
            return null;
        }
        for (int i = 0; i < cookies.length; i++) {
            Cookie cookie = cookies[i];
            if(name.equals(cookie.getName())) {
                cookie.setMaxAge(0);
                cookie.setPath("/");
                resp.addCookie(cookie);
                return cookie;
            }
        }
        return null;
    }
}
