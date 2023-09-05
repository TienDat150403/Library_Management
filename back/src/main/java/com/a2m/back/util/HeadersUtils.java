package com.a2m.back.util;

import com.a2m.back.constant.SecurityConstants;
import org.springframework.http.HttpHeaders;
import org.springframework.util.StringUtils;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;

/**
 * Author tiennd
 * Created date 2023-07-15
 */
public class HeadersUtils {

    public static HttpHeaders setHeaders() {
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes())
                .getRequest();
        String accessToken = getTokenFromRequest(request);
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(accessToken);
        return headers;
    }

    private static String getTokenFromRequest(HttpServletRequest request) {
        String headerAuth = request.getHeader(SecurityConstants.HEADER_STRING);
        if (StringUtils.hasText(headerAuth) && headerAuth.startsWith(SecurityConstants.TOKEN_PREFIX)) {
            return headerAuth.substring(7, headerAuth.length());
        }
        return null;
    }
}
