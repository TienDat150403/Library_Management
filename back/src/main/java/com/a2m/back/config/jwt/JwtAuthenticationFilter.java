package com.a2m.back.config.jwt;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

//import kr.a2m.slo.model.Logout;
//import kr.a2m.slo.service.impl.LogoutServiceImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import com.a2m.back.dao.user.UserDAO;
import com.a2m.back.model.Role;
import com.a2m.back.service.user.impl.UserDetailsServiceImpl;
import com.a2m.back.service.user.impl.UserServiceImpl;
import com.a2m.back.util.JwtProvinderUtils;

/**
 * Author tiennd
 * Created date 2023-07-08
 */
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private static final Logger logger = LoggerFactory.getLogger(JwtAuthenticationFilter.class);

    @Autowired
    private JwtProvinderUtils jwtProvinderUtils;

    @Autowired
    private UserDetailsServiceImpl userDetailsService;
    
    @Autowired
	private UserDAO userDAO;

    @Autowired
    UserServiceImpl userServiceImpl;
//    @Autowired
//    private LogoutServiceImpl logoutService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try {
            String jwt = jwtProvinderUtils.parseJwt(request);
            if (jwt != null && jwtProvinderUtils.validateJwtToken(jwt) && !jwtProvinderUtils.hasTokenExpired(jwt)) {

                String userUid = jwtProvinderUtils.getUserUidFromJwtToken(jwt);

                Map<String, Long> loginTimeDto = jwtProvinderUtils.getClaimsLoginTime(jwt);
//                Logout logoutTimeDto = logoutService.getLogout(userUid);

//                if (logoutTimeDto != null && logoutTimeDto.getLogoutTime() != null && logoutTimeDto.getLogoutTime() > 0) {
//                    Long loginTime = loginTimeDto.get("createdDate") - Long.parseLong(String.valueOf(loginTimeDto.get("offsetTimeZone")));
//                    Long lastLogoutTime = logoutTimeDto.getLogoutTime() - logoutTimeDto.getOffsetTimeZone();
//                    if (lastLogoutTime > loginTime) {
//                        throw new Exception("Logged out");
//                    }
//                }

                
                List<Role> roles = userDAO.getRoleForUser(userUid);
        		if (roles.size() == 0) {
        			userServiceImpl.setRole(userUid);
        		}
        		
                UserDetails userDetails = userDetailsService.loadUserByUserUid(userUid);
        		
                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                        userDetails, null, userDetails.getAuthorities());
                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        } catch (Exception e) {
            logger.error("Cannot set user authentication: {}", e);
        }
        filterChain.doFilter(request, response);
    }
}
