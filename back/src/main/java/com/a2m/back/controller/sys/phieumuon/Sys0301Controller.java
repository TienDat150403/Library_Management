package com.a2m.back.controller.sys.phieumuon;

import com.a2m.back.constant.CommonConstants;
import com.a2m.back.model.resp.DataResponse;
import com.a2m.back.model.resp.GenreBookResponse;
import com.a2m.back.model.resp.UserResponse;
import com.a2m.back.model.resp.phieumuonResponse;
import com.a2m.back.model.sys.EmpDto;
import com.a2m.back.model.sys.phieumuon.phieumuonDto;
import com.a2m.back.service.sys.impl.Sys0101ServiceImpl;
import com.a2m.back.service.sys.impl.book.Sys0202ServiceImpl;
import com.a2m.back.service.sys.impl.phieumuon.Sys0301ServiceImpl;
import com.a2m.back.service.user.UserService;
import com.a2m.back.service.user.impl.phieumuon.User0202ServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.xml.crypto.Data;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("api/admin/sys0301")
public class Sys0301Controller {
    @Autowired
    Sys0301ServiceImpl service0301Imlp;
    @Autowired
    User0202ServiceImpl service;

        @GetMapping("phieumuon/{STATUS}")
    public ResponseEntity<DataResponse> getAllPhieuMuon(@PathVariable int STATUS){
        List<phieumuonResponse> listRespose;
        DataResponse resp = new DataResponse();
        try {
            listRespose = service0301Imlp.getAllPhieuMuon(STATUS);
            resp.setStatus(CommonConstants.RESULT_OK);
            resp.setListResponseData(listRespose);
        }catch (Exception e){
            System.out.println(e);
        }
        return ResponseEntity.ok(resp);
    }

    @GetMapping("phieumuon/search/{STATUS}")
    public ResponseEntity<DataResponse> selectPhieuMuonByUsername(
            @PathVariable int STATUS,
            @RequestParam String username
            ){
        List<phieumuonResponse> listRespose;
        DataResponse resp = new DataResponse();
        try {
            listRespose = service0301Imlp.selectPhieuMuonByUsername(STATUS,username);
            resp.setStatus(CommonConstants.RESULT_OK);
            resp.setListResponseData(listRespose);
        }catch (Exception e){
            System.out.println(e);
        }
            return ResponseEntity.ok(resp);
    }


    @PostMapping("phieumuon-user/{STATUS}")
    public ResponseEntity<List<phieumuonResponse>> getPhieuMuonInfo(@PathVariable int STATUS , @RequestBody phieumuonDto obj){
        List<phieumuonResponse> listRespose = new ArrayList<>();
        try {
            listRespose = service0301Imlp.getPhieuMuonInfo(obj.getUser_uid().toString(), STATUS);
        }catch (Exception e){
            System.out.println(e);
        }
        return ResponseEntity.ok(listRespose);
    }

    @GetMapping("phieumuon-user/{userUid}/{STATUS}")
    public ResponseEntity<DataResponse> getDetailPhieuMuon(@PathVariable int STATUS , @PathVariable String userUid){
        phieumuonResponse obj;
        DataResponse resp= new DataResponse();
        try {
            obj = service0301Imlp.getDetailPhieuMuon(userUid, STATUS);
            resp.setResponseData(obj);
            resp.setStatus(CommonConstants.RESULT_OK);
        }catch (Exception e){
            resp.setStatus(CommonConstants.RESULT_NG);
            System.out.println(e);
        }
        return ResponseEntity.ok(resp);
    }

    @PutMapping("phieumuon-status/{idPhieuMuon}")
    public ResponseEntity<DataResponse> changeStatus (@PathVariable int idPhieuMuon){
        DataResponse resp = new DataResponse();
        try {
            service0301Imlp.changeStatus(1,idPhieuMuon);
            resp.setMessage("Cập nhật thành công");
            resp.setStatus(CommonConstants.RESULT_OK);
        }catch (Exception e){
            System.out.println(e);
        }
        return ResponseEntity.ok(resp);
    }

    @GetMapping("count/{userUid}")
    public ResponseEntity<DataResponse> countPhieuMuonOfUser(@PathVariable String userUid){
    	int count = 0;
        DataResponse resp = new DataResponse();
        try {
            count = service0301Imlp.getQuantityPhieuOfUser(userUid);
            resp.setStatus(CommonConstants.RESULT_OK);
            resp.setResponseData(count);
        }catch (Exception e){
            System.out.println(e);
        }
        return ResponseEntity.ok(resp);
    }

    @GetMapping("phieumuon-pagination/{STATUS}")
    public ResponseEntity<DataResponse<phieumuonResponse>> selectByPagination(@PathVariable int STATUS , @RequestParam("page") String page,
            @RequestParam(value = "statusBorrowDate") int statusBorrowDate){
        DataResponse resp = new DataResponse();
        List<phieumuonResponse> list;
        try {
            list = service0301Imlp.selectByPagination(STATUS,page, statusBorrowDate);
            resp.setStatus(CommonConstants.RESULT_OK);
            resp.setListResponseData(list);
        } catch (Exception e) {
            e.printStackTrace();
            resp.setStatus(CommonConstants.RESULT_NG);
        }
        return ResponseEntity.ok(resp);
    }

    @GetMapping("phieumuon/list-manage-user/{userUid}/{status}")
    public ResponseEntity<DataResponse> selectPagination (@PathVariable String userUid,@PathVariable int status, @RequestParam(required=false)  String page ){
        List<phieumuonResponse> listResponse;
        DataResponse resp = new DataResponse();
        try {
            listResponse= service.selectByPagination(status, userUid, page);
            resp.setListResponseData(listResponse);
            resp.setStatus(CommonConstants.RESULT_OK);
        }catch (Exception e){
            System.out.println(e);
        }
        return ResponseEntity.ok(resp);
    }

    @GetMapping("count-by-status/{status}")
    public ResponseEntity<DataResponse> getCountPhieuByStatus(@PathVariable int status){
        DataResponse resp = new DataResponse();
        try {
            int total = service0301Imlp.getCountPhieuByStatus(status);
            resp.setStatus(CommonConstants.RESULT_OK);
            resp.setResponseData(total);
        }catch (Exception e){
            System.out.println(e);
            resp.setStatus(CommonConstants.RESULT_NG);
        }
        return ResponseEntity.ok(resp);
    }

    @GetMapping("phieumuon/count/{userUid}/{status}")
    public ResponseEntity<DataResponse> getCountPhieuByStatusAndUserUid(@PathVariable String userUid,@PathVariable int status){
        DataResponse resp = new DataResponse();
        try {
            int total = service0301Imlp.getCountPhieuByStatusAndUserUid(status, userUid);
            resp.setStatus(CommonConstants.RESULT_OK);
            resp.setResponseData(total);
        }catch (Exception e){
            System.out.println(e);
            resp.setStatus(CommonConstants.RESULT_NG);
        }
        return ResponseEntity.ok(resp);
    }

}
