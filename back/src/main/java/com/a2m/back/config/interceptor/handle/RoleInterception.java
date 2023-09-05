package com.a2m.back.config.interceptor.handle;

import com.a2m.back.annotation.RolePermission;
import com.a2m.back.constant.RolePermissionType;
import com.a2m.back.exception.exc.RoleAccessDeniedException;
import com.a2m.back.model.Role;
import com.a2m.back.service.user.impl.UserDetailsImpl;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.lang.reflect.Method;
import java.util.List;

/**
 * Author tiennd
 * Created date 2023-07-15
 */

@Component
public class RoleInterception implements HandlerInterceptor {

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {

        if (handler instanceof HandlerMethod) {
            HandlerMethod handlerMethod = (HandlerMethod) handler;
            Method method = handlerMethod.getMethod();
            if (method != null) {
                RolePermission annotation = method.getAnnotation(RolePermission.class);
                RolePermissionType[] requiredPermissions = null;
                if (annotation != null) {
                    requiredPermissions = annotation.permissions();
                }
                Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
                UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
                List<Role> roles = userDetails.getUser().getRoles();
                if (!checkRolePermissionMatchAll(roles, requiredPermissions)) {
                    throw new RoleAccessDeniedException("You don't have permission to this method.");
                }
            }
        }
        return true;
    }

    private boolean checkRolePermissionMatchAll(List<Role> roles, RolePermissionType[] rolePermissionTypes) {
        if (rolePermissionTypes == null) {
            return true;
        }
        for (int i = 0; i < roles.size(); i++) {
            Role r = roles.get(i);
            for (int j = 0; j < rolePermissionTypes.length; j++) {
                if (rolePermissionTypes[j].getRole().equals(r.getRoleId())) {
                    return true;
                }
            }
        }
        return false;
    }
}
