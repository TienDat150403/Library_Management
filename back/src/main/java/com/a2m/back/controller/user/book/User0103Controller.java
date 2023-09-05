package com.a2m.back.controller.user.book;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.a2m.back.constant.CommonConstants;
import com.a2m.back.model.resp.DataResponse;
import com.a2m.back.model.resp.GenreBookResponse;
import com.a2m.back.service.user.book.User0103Service;
import com.a2m.back.util.JwtProvinderUtils;

@RestController
@RequestMapping("api/user/genre")
public class User0103Controller {

	@Autowired
	User0103Service user0103Service;
	
	@Autowired
    private JwtProvinderUtils jwtProvinderUtils;
	
	
	
	@GetMapping("genreBookForUser")
    public ResponseEntity<DataResponse> getListGenreBookForUserUid(HttpServletRequest request){
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
    		List<GenreBookResponse> listBook = user0103Service.getListGenreBookForUserUid(userUid);
    		resp.setStatus(CommonConstants.RESULT_OK);
    		resp.setListResponseData(listBook);
        } catch (Exception e) {
        	 e.printStackTrace();
             resp.setStatus(CommonConstants.RESULT_NG);
        }
        return ResponseEntity.ok(resp);
    }
	
}
