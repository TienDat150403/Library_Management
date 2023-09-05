package com.a2m.back.exception;

import com.a2m.back.constant.CommonConstants;
import com.a2m.back.exception.exc.AuthenticateException;
import com.a2m.back.exception.exc.LoggedOutException;
import com.a2m.back.exception.exc.RoleAccessDeniedException;
import com.a2m.back.model.resp.DataResponse;
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
    public ResponseEntity<DataResponse> handleExceptionAuth(AuthenticateException ex, WebRequest webRequest) {
        DataResponse response = new DataResponse(CommonConstants.RESULT_NG, ex.getMessage(), null, null);
        ResponseEntity<DataResponse> entity = new ResponseEntity<>(response, HttpStatus.NETWORK_AUTHENTICATION_REQUIRED);
        return entity;
    }

    @ExceptionHandler(RoleAccessDeniedException.class)
    public ResponseEntity<DataResponse> handleExceptionRoleAccessDenied(RoleAccessDeniedException ex, WebRequest webRequest) {
        DataResponse response = new DataResponse(CommonConstants.RESULT_NG, ex.getMessage(), null, null);
        ResponseEntity<DataResponse> entity = new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
        return entity;
    }

    @ExceptionHandler(LoggedOutException.class)
    public ResponseEntity<DataResponse> handleLoggedOut(LoggedOutException ex, WebRequest webRequest) {
        DataResponse response = new DataResponse(CommonConstants.RESULT_NG, ex.getMessage(), null, null);
        ResponseEntity<DataResponse> entity = new ResponseEntity<>(response, HttpStatus.GATEWAY_TIMEOUT);
        return entity;
    }
}
