package com.a2m.back.controller.user.phieumuon;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.a2m.back.constant.CommonConstants;
import com.a2m.back.model.resp.DataResponse;
import com.a2m.back.model.resp.phieumuonResponse;
import com.a2m.back.model.sys.EmpDto;
import com.a2m.back.model.sys.book.Book;
import com.a2m.back.model.sys.book.BookTitle;
import com.a2m.back.model.sys.phieumuon.phieumuonDto;
import com.a2m.back.service.user.phieumuon.User0201Service;
import com.a2m.back.util.JwtProvinderUtils;

@RestController
@RequestMapping("api/user/user0201")
public class User0201Controller {
	
	@Autowired
	User0201Service user0201Service;
	@Autowired
    private JwtProvinderUtils jwtProvinderUtils;
	
	@PostMapping("add")
	public ResponseEntity<DataResponse> addPhieuMuon(@RequestBody phieumuonResponse phieumuon, HttpServletRequest request) {
//		System.out.println(phieumuon.getBook().length);
		String jwt = jwtProvinderUtils.parseJwt(request);
        String userUid = "";
        DataResponse resp = new DataResponse();
        try {
            userUid = jwtProvinderUtils.getUserUidFromJwtToken(jwt);
            phieumuon.setUserUid(Long.parseLong(userUid));
        } catch (Exception e) {
            e.printStackTrace();
            resp.setStatus(CommonConstants.RESULT_WN);
            resp.setMessage("Người dùng chưa đăng nhập!");
        }
        
        try {
        	int res = user0201Service.checkPhieuMuonExists(Long.parseLong(userUid));
        	if (res != 0) {
        		resp.setStatus(CommonConstants.RESULT_NG);
        		resp.setMessage("Có phiếu mượn chưa trả");
        		return ResponseEntity.ok(resp);
        	}
//        	resp.setResponseData(result);
        	else resp.setStatus(CommonConstants.RESULT_OK);
        } catch (Exception e) {
            e.printStackTrace();
            resp.setStatus(CommonConstants.RESULT_NG);
        }
        
        try {
        	user0201Service.addPhieuMuon(phieumuon);
//        	resp.setResponseData(result);
        	resp.setStatus(CommonConstants.RESULT_OK);
        } catch (Exception e) {
            e.printStackTrace();
            resp.setStatus(CommonConstants.RESULT_NG);
            resp.setMessage("Có lỗi trong việc thêm phiếu mượn, vui lòng thử lại");
        }
        return ResponseEntity.ok(resp);
    }	
	
	@GetMapping("available/{bookCode}")
	public ResponseEntity<DataResponse> getAvailableBookByBookCode(@PathVariable String bookCode) {
        DataResponse resp = new DataResponse();
        try {
        	String res = user0201Service.getAvailableBookByBookCode(bookCode);
        	resp.setResponseData(res);
        	resp.setStatus(CommonConstants.RESULT_OK);
        } catch (Exception e) {
            e.printStackTrace();
            resp.setStatus(CommonConstants.RESULT_NG);
        }
        return ResponseEntity.ok(resp);
    }
	
	@GetMapping("get/{bookCode}")
	public ResponseEntity<DataResponse> getBooksByBookCode(@PathVariable String bookCode) {
        DataResponse resp = new DataResponse();
        try {
        	List<Book> result = user0201Service.getBooksByBookCode(bookCode);
        	resp.setResponseData(result);
        	resp.setStatus(CommonConstants.RESULT_OK);
        } catch (Exception e) {
            e.printStackTrace();
            resp.setStatus(CommonConstants.RESULT_NG);
        }
        return ResponseEntity.ok(resp);
    }
	
	@GetMapping("get/phieumuon")
	public ResponseEntity<DataResponse> checkPhieuMuonExists(HttpServletRequest request){
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
        	int result = user0201Service.checkPhieuMuonExists(Long.parseLong(userUid));
    		resp.setResponseData(result);
        	resp.setStatus(CommonConstants.RESULT_OK);
        } catch (Exception e) {
            e.printStackTrace();
            resp.setStatus(CommonConstants.RESULT_NG);
        }
        return ResponseEntity.ok(resp);
	}
}