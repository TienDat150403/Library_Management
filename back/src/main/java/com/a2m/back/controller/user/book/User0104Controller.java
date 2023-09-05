package com.a2m.back.controller.user.book;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

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
import com.a2m.back.model.resp.NotificationResponse;
import com.a2m.back.model.user.book.NotificationDto;
import com.a2m.back.service.user.book.User0104Service;
import com.a2m.back.util.JwtProvinderUtils;


//test
@RestController
@RequestMapping("api/user/notification")
public class User0104Controller {
	@Autowired
	User0104Service user0104Service;
	
	@Autowired
    private JwtProvinderUtils jwtProvinderUtils;
	
	@PostMapping("insert/{userUid}")
    public ResponseEntity<DataResponse> insert(@RequestBody NotificationDto noti, @PathVariable String userUid){
		DataResponse resp = new DataResponse();

		try {
			noti.setUserUid(userUid);
            int result = user0104Service.addNotification(noti);
            if(result == 1) {
            	resp.setStatus(CommonConstants.RESULT_OK);
            	resp.setMessage("Thêm thông báo thành công");
                resp.setResponseData(noti);
            }
            else {
            	resp.setStatus(CommonConstants.RESULT_NG);
            	resp.setMessage("Sách đã được đặt thông báo!");
            }
            
        } catch (Exception e) {
            e.printStackTrace();
            resp.setStatus(CommonConstants.RESULT_NG);
        	resp.setMessage("ĐẶt thông báo thất bại!");

        }
        return ResponseEntity.ok(resp);
    }
	
	@GetMapping("get")
    public ResponseEntity<DataResponse> getListNotification(HttpServletRequest request, @RequestParam("page") int page ){
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
    		List<NotificationResponse> listNoti = user0104Service.getNotificationByUserUid(userUid, page);
    		resp.setStatus(CommonConstants.RESULT_OK);
    		resp.setListResponseData(listNoti);
        } catch (Exception e) {
        	 e.printStackTrace();
             resp.setStatus(CommonConstants.RESULT_NG);
        }
        return ResponseEntity.ok(resp);
    }
	
	@GetMapping("count")
    public ResponseEntity<DataResponse> countNotification(HttpServletRequest request){
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
    		int result = user0104Service.countNoti(userUid);
    		resp.setStatus(CommonConstants.RESULT_OK);
    		resp.setResponseData(result);
        } catch (Exception e) {
        	 e.printStackTrace();
             resp.setStatus(CommonConstants.RESULT_NG);
        }
        return ResponseEntity.ok(resp);
    }
	
	@GetMapping("countUnread")
    public ResponseEntity<DataResponse> countNotificationUnread(HttpServletRequest request){
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
    		int result = user0104Service.countNotiUnread(userUid);
    		resp.setStatus(CommonConstants.RESULT_OK);
    		resp.setResponseData(result);
        } catch (Exception e) {
        	 e.printStackTrace();
             resp.setStatus(CommonConstants.RESULT_NG);
        }
        return ResponseEntity.ok(resp);
    }
	
	
	
	@PutMapping("update")
	public ResponseEntity<DataResponse> updateStatusIsReadTrue(@RequestBody List<String> listNotification_id){
		DataResponse resp = new DataResponse();

    	try {
    		int result = user0104Service.updateStatusIsReadTrue(listNotification_id);
    		resp.setStatus(CommonConstants.RESULT_OK);
        } catch (Exception e) {
        	 e.printStackTrace();
             resp.setStatus(CommonConstants.RESULT_NG);
        }
        return ResponseEntity.ok(resp);
    }
}
