package com.a2m.back.controller.user.phieumuon;

import com.a2m.back.constant.CommonConstants;
import com.a2m.back.model.resp.DataResponse;
import com.a2m.back.model.resp.phieumuonResponse;
import com.a2m.back.service.user.impl.phieumuon.User0203ServiceImpl;
import com.a2m.back.service.user.phieumuon.User0202Service;
import com.a2m.back.util.JwtProvinderUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("api/user/user0203")
public class User0203Controller {

    @Autowired
    User0203ServiceImpl user0203Service;
    @Autowired
    private JwtProvinderUtils jwtProvinderUtils;

    @PostMapping("phieumuon/extend")
    public ResponseEntity<DataResponse> checkExpandable (@RequestBody phieumuonResponse phieumuon, HttpServletRequest request){
        DataResponse resp = new DataResponse();
        try {
        	int res = user0203Service.extendReturnDate(phieumuon);
        	if (res == 0) {
        		resp.setStatus(CommonConstants.RESULT_NG);
        		resp.setMessage("Không thể gia hạn do đã đạt giới hạn số lần gia hạn");
        		
        	}
        	else if (res == 1) {
        		resp.setStatus(CommonConstants.RESULT_NG);
        		resp.setMessage("Không thể gia hạn do đã quá thời hạn được phép gia hạn");
        	}
        	else {
        		resp.setStatus(CommonConstants.RESULT_OK);
        		resp.setMessage("Gia hạn thành công!");
        	}
        }catch (Exception e){
            System.out.println(e);
            resp.setStatus(CommonConstants.RESULT_NG);
            resp.setMessage("");
        }
        return ResponseEntity.ok(resp);
    }

}
