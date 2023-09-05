package com.a2m.sso.model.exception;

import com.a2m.sso.constant.CommonConstants;
import com.a2m.sso.model.exception.exc.AuthenticateException;
import com.a2m.sso.model.DataResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

/**
 * Author tiennd
 * Created date 2023-07-08
 */
@ControllerAdvice
public class A2mSsoExceptionHandling extends ResponseEntityExceptionHandler {

    @ExceptionHandler(AuthenticateException.class)
    public ResponseEntity<Object> handleException(AuthenticateException ex, WebRequest webRequest) {
        DataResponse response = new DataResponse(CommonConstants.RESULT_NG, ex.getMessage(), null);
        ResponseEntity<Object> entity = new ResponseEntity<>(response, HttpStatus.NETWORK_AUTHENTICATION_REQUIRED);
        return entity;
    }
}
