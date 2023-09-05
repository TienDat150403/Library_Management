package com.a2m.back.exception.exc;

/**
 * Author tiennd
 * Created date 2023-07-15
 */
public class RoleAccessDeniedException extends RuntimeException {
    public RoleAccessDeniedException(String message) {
        super(message);
    }
}
