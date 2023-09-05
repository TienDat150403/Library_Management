package com.a2m.sso.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.a2m.sso.constant.CommonConstants;
import com.a2m.sso.model.DataResponse;
import com.a2m.sso.model.UserResponse;
import com.a2m.sso.service.UserService;

import javax.xml.crypto.Data;
import java.util.List;

/**
 * Author tiennd
 * Created date 2023-07-15
 */

@RestController
@RequestMapping("api/user")
public class UserApiController {

    @Autowired
    private UserService userService;

    @GetMapping("getUserInfo")
    public ResponseEntity<UserResponse> getUserInfo() {
        DataResponse resp = new DataResponse();
        try {
            UserResponse userResponse = userService.getUserInfo();
            resp.setStatus(CommonConstants.RESULT_OK);
            resp.setResponseData(userResponse);
        } catch (Exception e) {
            e.printStackTrace();
            resp.setStatus(CommonConstants.RESULT_NG);
        }
        return ResponseEntity.ok((UserResponse) resp.getResponseData());
    }

    @PostMapping("updateUserInfo")
    public ResponseEntity<DataResponse> updateUserInfo(@RequestBody UserResponse userResponse) {
        DataResponse resp = new DataResponse();
        try {
            userService.updateUserInfo(userResponse);
//            UserResponse userResponse = userService.getUserInfo();
            resp.setStatus(CommonConstants.RESULT_OK);
//            resp.setResponseData(userResponse);
        } catch (Exception e) {
            e.printStackTrace();
            resp.setStatus(CommonConstants.RESULT_NG);
        }
//        return ResponseEntity.ok((UserResponse) resp.getResponseData());
        return ResponseEntity.ok(resp);
    }

    @GetMapping("count")
    public ResponseEntity<Integer> getCountUser(@RequestParam String status) {
        int total = 0;
        try {
            total = userService.getCountUser(status );
        } catch (Exception e) {
            System.out.println(e);
        }
        return ResponseEntity.ok(total);
    }

    @PutMapping("disable")
    public ResponseEntity<DataResponse> diActiveUser(@RequestParam String userUid) {
        DataResponse resp = new DataResponse();
        try {
            userService.diActiveUser(userUid);
            resp.setStatus(CommonConstants.RESULT_OK);
        } catch (Exception e) {
            System.out.println(e);
            resp.setStatus(CommonConstants.RESULT_NG);
        }
        return ResponseEntity.ok(resp);
    }
    @PostMapping("/cover/add/{fileName}")
    public ResponseEntity<DataResponse> addUserCover(@PathVariable String fileName) {
     DataResponse resp = new DataResponse();
        try {
        	userService.addUserCover(fileName);
        	resp.setStatus(CommonConstants.RESULT_OK);
        } catch (Exception e) {
            e.printStackTrace();
            resp.setStatus(CommonConstants.RESULT_NG);
        }
        return ResponseEntity.ok(resp);
    }

}
