package com.a2m.back.controller.sys;

import java.util.ArrayList;
import java.util.List;

import javax.validation.Valid;

import com.a2m.back.service.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.a2m.back.constant.CommonConstants;
import com.a2m.back.model.resp.DataResponse;
import com.a2m.back.model.resp.UserResponse;
import com.a2m.back.model.sys.EmpDto;
import com.a2m.back.service.sys.Sys0101Service;

/**
 * Author tiennd
 * Created date 2023-07-17
 */

@RestController
@RequestMapping("api/admin/sys0101")
public class Sys0101Controller {

    @Autowired
    private Sys0101Service sys0101Service;

    @GetMapping("listUserInfo/{status}")
    public ResponseEntity<DataResponse> getListUserInfo(@PathVariable String status, @RequestParam(required = false) String page) {
        DataResponse resp = new DataResponse();
        List<UserResponse> listUser;
        try {
            listUser = sys0101Service.getListUserInfo(status,page);
            resp.setListResponseData(listUser);
            resp.setStatus(CommonConstants.RESULT_OK);
        } catch (Exception e) {

        }
        return ResponseEntity.ok(resp);
    }

    @GetMapping("userInfo/{userUid}")
    public ResponseEntity<UserResponse> getUserInfoByUserUid(@PathVariable String userUid) {
        UserResponse resp = new UserResponse();
        try {
            resp = sys0101Service.getUserInfoByUserUid(userUid);
//    		resp.setStatus(CommonConstants.RESULT_OK);
        } catch (Exception e) {

        }
        return ResponseEntity.ok(resp);
    }

    @PostMapping("insert")
    public ResponseEntity<DataResponse> insert(@Valid @RequestBody EmpDto empDto) {
        DataResponse resp = new DataResponse();
        try {
            int result = sys0101Service.insert(empDto);
            resp.setStatus(CommonConstants.RESULT_OK);
            resp.setResponseData(empDto);
        } catch (Exception e) {
            e.printStackTrace();
            resp.setStatus(CommonConstants.RESULT_NG);
        }
        return ResponseEntity.ok(resp);
    }

    @GetMapping("searchByUserId/{userId}")
    public ResponseEntity<DataResponse> searchByUserId(@PathVariable String userId) {
        DataResponse resp = new DataResponse();
        try {
            List<UserResponse> listResp = sys0101Service.searchByUserId(userId);
            resp.setListResponseData(listResp);
            resp.setStatus(CommonConstants.RESULT_OK);
        } catch (Exception e) {
            resp.setStatus(CommonConstants.RESULT_NG);
            System.out.println(e);
        }
        return ResponseEntity.ok(resp);
    }

    @PutMapping("disable")
    public ResponseEntity<DataResponse> disableUser (@RequestParam String userUid){
        DataResponse resp = new DataResponse();
        try {
            resp = sys0101Service.diActiveUser(userUid);
//            resp.setStatus(CommonConstants.RESULT_OK);
        }catch (Exception e){
            resp.setStatus(CommonConstants.RESULT_NG);
            System.out.println(e);
        }
        return ResponseEntity.ok(resp);
    }

    @GetMapping("count")
    public ResponseEntity<DataResponse> getCountUser() {
        DataResponse resp = new DataResponse();
        try {
            resp.setStatus(CommonConstants.RESULT_OK);
            resp.setResponseData( sys0101Service.getCountUser());
        } catch (Exception e) {
            System.out.println(e);
            resp.setStatus(CommonConstants.RESULT_NG);
        }
        return ResponseEntity.ok(resp);
    }

}
