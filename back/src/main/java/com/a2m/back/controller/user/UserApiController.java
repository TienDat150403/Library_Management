package com.a2m.back.controller.user;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.a2m.back.constant.CommonConstants;
import com.a2m.back.model.Role;
import com.a2m.back.model.resp.DataResponse;
import com.a2m.back.model.resp.UserResponse;
import com.a2m.back.service.user.UserService;

/**
 * Author tiennd
 * Created date 2023-07-15
 */

@RestController
@RequestMapping("api/user")
public class UserApiController {

    @Autowired
    private UserService userService;

    // @RolePermission(permissions = {RolePermissionType.ROLE_ADMIN, RolePermissionType.ROLE_NORMAL})
    // @GetMapping("getUserInfo.exclude")
    @GetMapping("getUserInfo")
    public ResponseEntity<DataResponse<UserResponse>> getUserInfo() {
        DataResponse resp = new DataResponse();
        try {
            UserResponse userResponse = userService.getUserInfo();
            resp.setStatus(CommonConstants.RESULT_OK);
            resp.setResponseData(userResponse);
        } catch (Exception e) {
            e.printStackTrace();
            resp.setStatus(CommonConstants.RESULT_NG);
        }
        return ResponseEntity.ok(resp);
    }
    
    @PostMapping("updateUserInfo")
    public ResponseEntity<DataResponse<UserResponse>> updateUserInfo(@RequestBody UserResponse userResponse) {
        DataResponse resp = new DataResponse();
        try {
        	resp = userService.updateUserInfo(userResponse);
        } catch (Exception e) {
            e.printStackTrace();
//            resp.setStatus(CommonConstants.RESULT_NG);
        }
        return ResponseEntity.ok(resp);
    }

    @GetMapping("logout")
    public ResponseEntity<DataResponse> logout() {
        DataResponse resp = new DataResponse();
        try {
            int result = userService.logout();
            if (result == 0) {
                resp.setStatus(CommonConstants.RESULT_NG);
            } else {
                resp.setStatus(CommonConstants.RESULT_OK);
            }
        } catch (Exception e) {
            e.printStackTrace();
            resp.setStatus(CommonConstants.RESULT_NG);
        }
        return ResponseEntity.ok(resp);
    }

    @GetMapping("getRoles")
    public ResponseEntity<DataResponse> getRoles() {
        DataResponse resp = new DataResponse();
        try {
            List<Role> roles = userService.getRoles();
            resp.setStatus(CommonConstants.RESULT_OK);
            resp.setResponseData(roles);
            resp.setListResponseData(roles);
        } catch (Exception e) {
            e.printStackTrace();
            resp.setStatus(CommonConstants.RESULT_NG);
        }
        return ResponseEntity.ok(resp);
    }
    
    @GetMapping("/cover/{fileName}")
    public ResponseEntity<DataResponse> getUserCover(@PathVariable String fileName){
    	DataResponse resp = new DataResponse();
		try {
			String base64Image = userService.getUserCover(fileName);
		    resp.setStatus(CommonConstants.RESULT_OK);
			resp.setResponseData(base64Image);
			
		} catch (Exception e) {
          e.printStackTrace();
          resp.setStatus(CommonConstants.RESULT_NG);
		}
		return ResponseEntity.ok(resp);
    }
    
    @PostMapping("/cover/add")
    public ResponseEntity<DataResponse> addUserCover(@RequestParam("file") MultipartFile file) {
     DataResponse resp = new DataResponse();
        try {
        	userService.addUserCover(file);
        	resp.setStatus(CommonConstants.RESULT_OK);
        } catch (Exception e) {
            e.printStackTrace();
            resp.setStatus(CommonConstants.RESULT_NG);
        }
        return ResponseEntity.ok(resp);
    }

        @GetMapping("count/{status}")
    public ResponseEntity<DataResponse> getCountUser(@PathVariable String status){
        DataResponse resp= new DataResponse();
        try {
            resp.setResponseData(userService.countUser(status));
            resp.setStatus(CommonConstants.RESULT_OK);
        }catch (Exception e){
            System.out.println(e);
            resp.setStatus(CommonConstants.RESULT_NG);
        }
        return ResponseEntity.ok(resp);
    }
}
