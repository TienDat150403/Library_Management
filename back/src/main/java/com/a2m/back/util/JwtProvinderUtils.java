package com.a2m.back.util;

import java.security.PublicKey;
import java.util.Date;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.a2m.back.constant.SecurityConstants;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.UnsupportedJwtException;

/**
 * Author tiennd
 * Created date 2023-07-08
 */

@Service
public class JwtProvinderUtils {

    private static final Logger logger = LoggerFactory.getLogger(JwtProvinderUtils.class);

    public String getUserUidFromJwtToken(String token) throws Exception {
        return getClaimsFromToken(token).getSubject();
    }

    public Map<String, Long> getClaimsLoginTime(String token) throws Exception {
        return getClaimsFromToken(token).get("loginTime", Map.class);
    }

    public Claims getClaimsFromToken(String token) throws Exception {
        PublicKey key = RsaUtils.getPublicKey();
        return Jwts.parser()
                .setSigningKey(key)
                .parseClaimsJws(token)
                .getBody();
    }

    public boolean hasTokenExpired(String token) throws Exception {
        Claims claims = Jwts.parser().setSigningKey(RsaUtils.getPublicKey()).parseClaimsJws(token).getBody();
        Date tokenExpirationDate = claims.getExpiration();
        Date today = new Date();
        return tokenExpirationDate.before(today);
    }

    public String parseJwt(HttpServletRequest request) {
        String headerAuth = request.getHeader(SecurityConstants.HEADER_STRING);
        if (StringUtils.hasText(headerAuth) && headerAuth.startsWith(SecurityConstants.TOKEN_PREFIX)) {
            return headerAuth.substring(7, headerAuth.length());
        }
        return null;
    }

    public boolean validateJwtToken(String token) {
        try {
            Jwts.parser().setSigningKey(RsaUtils.getPublicKey()).parseClaimsJws(token);
            return true;
        } catch (MalformedJwtException ex) {
            logger.error("Invalid JWT token");
        } catch (ExpiredJwtException ex) {
            logger.error("Expired JWT token");
        } catch (UnsupportedJwtException ex) {
            logger.error("Unsupported JWT token");
        } catch (IllegalArgumentException ex) {
            logger.error("JWT claims string is empty.");
        } catch (SignatureException e) {
            logger.error("JWT claims string is empty. SignatureException");
        } catch (Exception e) {
            logger.error("JWT claims string is empty. Exception");
        }
        return false;
    }
}
