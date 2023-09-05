package com.a2m.back.service.user;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.a2m.back.model.Role;
import com.a2m.back.model.resp.DataResponse;
import com.a2m.back.model.resp.UserResponse;

/**
 * Author tiennd
 * Created date 2023-07-08
 */
public interface UserService {
    UserResponse getUserInfo() throws Exception;
    
    DataResponse updateUserInfo(UserResponse userResponse) throws Exception;

    int logout() throws Exception;

    List<Role> getRoles() throws Exception;

    void setRole(String userUid) throws Exception;

	String getUserCover(String fileName);

	void addUserCover(MultipartFile file);
    DataResponse diActiveUser(String USER_UID);
    Integer countUser(String status);
}
