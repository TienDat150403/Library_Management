package com.a2m.back.annotation;

import com.a2m.back.constant.RolePermissionType;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * Author tiennd
 * Created date 2023-07-15
 */

@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
public @interface RolePermission {
    public RolePermissionType[] permissions() default {};
}
