package com.a2m.back.controller.user.phieumuon;

import com.a2m.back.constant.CommonConstants;
import com.a2m.back.model.resp.DataResponse;
import com.a2m.back.model.resp.phieumuonResponse;
import com.a2m.back.service.sys.impl.phieumuon.Sys0303ServiceImpl;
import com.a2m.back.service.user.impl.phieumuon.User0202ServiceImpl;
import com.a2m.back.util.JwtProvinderUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping("api/user/user0202")
public class User0202Controller {

    @Autowired
    User0202ServiceImpl service;
    @Autowired
    private JwtProvinderUtils jwtProvinderUtils;
    @Autowired
    Sys0303ServiceImpl sys0303Service;

    @GetMapping("phieumuon/list/{status}")
    public ResponseEntity<DataResponse> selectAll(@PathVariable int status, HttpServletRequest request) {
        List<phieumuonResponse> listResponse;
        String jwt = jwtProvinderUtils.parseJwt(request);
        String userUid = "";
        DataResponse resp = new DataResponse();

        try {
            userUid = jwtProvinderUtils.getUserUidFromJwtToken(jwt);
        } catch (Exception e) {
            e.printStackTrace();
            resp.setStatus(CommonConstants.RESULT_WN);
            resp.setMessage("Người dùng chưa đăng nhập!");
        }

        try {
            listResponse = service.getAllPhieuMuon(status, userUid);
            resp.setStatus(CommonConstants.RESULT_OK);
            resp.setListResponseData(listResponse);
        } catch (Exception e) {
            System.out.println(e);
        }
        return ResponseEntity.ok(resp);
    }

    @GetMapping("phieumuon/list-pagination/{status}")
    public ResponseEntity<DataResponse> selectPagination(@PathVariable int status, @RequestParam(required = false) String page, HttpServletRequest request) {
        List<phieumuonResponse> listResponse;
        String jwt = jwtProvinderUtils.parseJwt(request);
        String userUid = "";
        DataResponse resp = new DataResponse();

        try {
            userUid = jwtProvinderUtils.getUserUidFromJwtToken(jwt);
        } catch (Exception e) {
            e.printStackTrace();
            resp.setStatus(CommonConstants.RESULT_WN);
            resp.setMessage("Người dùng chưa đăng nhập!");
        }

        try {
            listResponse = service.selectByPagination(status, userUid, page);
            resp.setStatus(CommonConstants.RESULT_OK);
            resp.setListResponseData(listResponse);
        } catch (Exception e) {
            System.out.println(e);
        }
        return ResponseEntity.ok(resp);
    }

    @GetMapping("phieumuon/cancel/{idPhieuMuon}")
    public ResponseEntity<DataResponse> cancelPhieuDangChoXacNhan(@PathVariable String idPhieuMuon, HttpServletRequest request) {
        DataResponse resp = new DataResponse();
        String jwt = jwtProvinderUtils.parseJwt(request);
        String userUid = "";
        try {
            userUid = jwtProvinderUtils.getUserUidFromJwtToken(jwt);
        } catch (Exception e) {
            e.printStackTrace();
            resp.setStatus(CommonConstants.RESULT_WN);
            resp.setMessage("Người dùng chưa đăng nhập!");
        }
        try {
            int result = service.cancelPhieu(idPhieuMuon, userUid);
            resp.setStatus(CommonConstants.RESULT_OK);
        } catch (Exception e) {
            resp.setStatus(CommonConstants.RESULT_NG);
            System.out.println(e);
        }
        return ResponseEntity.ok(resp);
    }

    @GetMapping("phieumuon/chi-tiet")
    public ResponseEntity<DataResponse> getDetailPhieuMuon(@RequestParam int id) {
        DataResponse resp = new DataResponse();
        try {
            phieumuonResponse response = sys0303Service.getDetailPhieuMuon(id);
            resp.setResponseData(response);
            resp.setStatus(CommonConstants.RESULT_OK);
        } catch (Exception e) {
            System.out.println(e);
        }
        return ResponseEntity.ok(resp);
    }

    @GetMapping("count/{status}")
    public ResponseEntity<DataResponse> getCountPhieuByUserUidAndStatus(@PathVariable int status, HttpServletRequest req) {
        DataResponse resp = new DataResponse();
        String jwt = jwtProvinderUtils.parseJwt(req);
        String userUid = "";

        try {
            userUid = jwtProvinderUtils.getUserUidFromJwtToken(jwt);
        } catch (Exception e) {
            e.printStackTrace();
            resp.setStatus(CommonConstants.RESULT_WN);
            resp.setMessage("Người dùng chưa đăng nhập!");
        }

        try {
            int total = service.getCountPhieuByUserUidAndStatus(status, userUid);
            resp.setStatus(CommonConstants.RESULT_OK);
            resp.setResponseData(total);
        } catch (Exception e) {
            System.out.println(e);
            resp.setStatus(CommonConstants.RESULT_NG);
        }
        return ResponseEntity.ok(resp);
    }

}
