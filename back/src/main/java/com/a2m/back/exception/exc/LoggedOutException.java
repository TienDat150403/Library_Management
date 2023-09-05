package com.a2m.back.exception.exc;

/**
 * @author tiennd
 */
public class LoggedOutException extends RuntimeException {
    public LoggedOutException(String message) {
        super(message);
    }
}
