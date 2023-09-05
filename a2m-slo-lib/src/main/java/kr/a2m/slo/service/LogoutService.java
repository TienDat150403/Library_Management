package kr.a2m.slo.service;

import kr.a2m.slo.model.Logout;

/**
 * @author tiennd
 */
public interface LogoutService {
    int logout(String userUid) throws Exception;

    Logout getLogout(String userUid) throws Exception;
}
