package com.a2m.sso.model.exception.exc;

/**
 * Author tiennd
 * Created date 2023-07-08
 */
public class AuthenticateException extends RuntimeException {
    public AuthenticateException(String message) {
        super(message);
    }
}
