package com.a2m.sso.util;

import com.a2m.sso.constant.SecurityConstants;
import com.a2m.sso.service.impl.UserDetailsImpl;
import io.jsonwebtoken.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.security.PrivateKey;
import java.security.PublicKey;
import java.util.*;

/**
 * Author tiennd
 * Created date 2023-07-08
 */

@Service
public class JwtProvinderUtils {

    private static final Logger logger = LoggerFactory.getLogger(JwtProvinderUtils.class);

    @Value("${spring.security.jwt.expirationMs}")
    public int jwtExpirationMs;

    public String generateJwtByPrivateKey(Authentication authentication) {
        UserDetailsImpl userPrincipal = (UserDetailsImpl) authentication.getPrincipal();
        try {
            PrivateKey privateKey = RsaUtils.getPrivateKey();
            TimeZone zone = TimeZone.getDefault();
            Map<String, Long> data = new HashMap<>();
            data.put("createdDate", new Date().getTime());
            data.put("offsetTimeZone", (long) zone.getOffset(Calendar.ZONE_OFFSET));
            Map<String, Object> claims = new HashMap<>();
            claims.put("loginTime", data);
            return Jwts.builder()
                    .setClaims(claims)
                    .setSubject(userPrincipal.getUser().getUserUid())
                    .setIssuedAt(new Date())
                    .setExpiration(new Date((new Date()).getTime() + jwtExpirationMs))
                    .signWith(SignatureAlgorithm.RS256, privateKey)
                    .compact();
        } catch (IOException e) {
            throw new RuntimeException(e);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public String getUserUidFromJwtToken(String token) throws Exception {
        return getClaimsFromToken(token).getSubject();
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
