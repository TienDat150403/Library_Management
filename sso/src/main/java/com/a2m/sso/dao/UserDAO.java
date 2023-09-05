package com.a2m.sso.dao;

import java.util.Date;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.cache.annotation.Cacheable;

import com.a2m.sso.model.UserResponse;
import com.a2m.sso.model.req.NewPassword;
import com.a2m.sso.model.req.SignUpReq;

/**
 * Author tiennd Created date 2023-07-08
 */

@Mapper
public interface UserDAO {
    @Cacheable("user")
    UserResponse getUserInfoByUserUid(String userUid);

    UserResponse getUserByUserId(String userId);

    void updateUserInfoByUserUid(UserResponse user);

    void insertUser(SignUpReq user);

    void insertUserInfo(SignUpReq user);

    void insertUserDAO(SignUpReq user);

    void updateStatusUser(String verifyKey); // dùng khi đăng ký

    void diActiveUser(String USER_UID);

    void updateVerifyKeyNull(String verifyKey);

    void updateVerifyKeyByUserId(Map<String, Object> params); // dùng khi quên mật khẩu, đăng ký

    void updateExpiredKeyByUserId(Date expiredKey);

//	void updateVerifyKeyByUserId();

    boolean isEmailExists(String email);

    boolean isUsernameExists(String user_id);

    boolean isActivate(String user_uid);

    void updatePasswordByVerifyKey(NewPassword newPassword);

    boolean isExpiredKey(String verifyKey);

    List<UserResponse> getListUserInfo(String status, int ignore);

    void addUserCover(String imgFileName, Long userUid);

    List<UserResponse> searchByUserId(String USER_ID);

    Integer getCountUser(String status);
}
