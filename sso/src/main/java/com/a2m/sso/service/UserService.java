package com.a2m.sso.service;

import java.util.List;

import com.a2m.sso.model.UserResponse;
import com.a2m.sso.model.req.NewPassword;
import com.a2m.sso.model.req.SignUpReq;
import com.a2m.sso.model.req.forgotPasswordReq;

/**
 * Author tiennd
 * Created date 2023-07-08
 */
public interface UserService {
    UserResponse getUserInfo() throws Exception;
    
    void updateUserInfo(UserResponse userResponse) throws Exception;
    void diActiveUser(String USER_UID);
    String saveUserDao(SignUpReq user);
    
    void verifyUser(String verifyKey);
    
    boolean isActivate(String user_id);
        
    String forgotPassword(forgotPasswordReq forgotPasswordReq);
    
    boolean changePassword(NewPassword newPass);
    
    boolean isExpiredKey(String verifyKey);
    
    List<UserResponse> getListUserInfo(String status, String page);
    
    UserResponse getUserInfoByUserUid(String userUid);
    List<UserResponse> searchByUserId(String USER_ID);
    Integer getCountUser(String status );
	void addUserCover(String fileName);

}
