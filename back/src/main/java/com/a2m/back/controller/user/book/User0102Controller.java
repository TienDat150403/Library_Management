package com.a2m.back.controller.user.book;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.a2m.back.constant.CommonConstants;
import com.a2m.back.model.resp.BookResponse;
import com.a2m.back.model.resp.DataResponse;
import com.a2m.back.model.user.book.WishListDto;
import com.a2m.back.service.user.book.User0102Service;
import com.a2m.back.util.JwtProvinderUtils;

@RestController
@RequestMapping("api/user/waitlist")
public class User0102Controller {

	@Autowired
	User0102Service user0102Service;
	
	@Autowired
    private JwtProvinderUtils jwtProvinderUtils;
	
	@PostMapping("insert")
    public ResponseEntity<DataResponse> insert(@RequestBody WishListDto wishList, HttpServletRequest request){
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
			wishList.setUserUid(userUid);
            int result = user0102Service.addBookToWishList(wishList);
            if(result == 1) {
            	resp.setStatus(CommonConstants.RESULT_OK);
            	resp.setMessage("Đặt thông báo thành công");
                resp.setResponseData(wishList);
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
	
	@PostMapping("delete")
    public ResponseEntity<DataResponse> delete(@RequestBody  WishListDto wishList, HttpServletRequest request){
		DataResponse resp = new DataResponse();
		
		String jwt = jwtProvinderUtils.parseJwt(request);
		String userUid = "";
		try {
			 userUid = jwtProvinderUtils.getUserUidFromJwtToken(jwt);
		} catch (Exception e) {
			e.printStackTrace();
			resp.setStatus(CommonConstants.RESULT_NG);
        	resp.setMessage("Người dùng chưa đăng nhập!");
		}
		
		try {
			wishList.setUserUid(userUid);
            int result = user0102Service.deleteFromWishList(wishList);
            if(result == 1) {
            	resp.setStatus(CommonConstants.RESULT_OK);
            	resp.setMessage("Hủy thông báo thành công");
//                resp.setResponseData(cart);
            }
            else {
            	resp.setStatus(CommonConstants.RESULT_NG);
            	resp.setMessage("Sách không được đặt thông báo!");
            }
            
        } catch (Exception e) {
            e.printStackTrace();
            resp.setStatus(CommonConstants.RESULT_NG);
        }
        return ResponseEntity.ok(resp);
    }
	
	//method này dùng bên sys ms hợp lí, khi sử dụng nên bỏ qua /sys/ để có quyền
	@GetMapping("getUserUid/{bookCode}")
    public ResponseEntity<DataResponse> getListUserUidByBookCode(@PathVariable String bookCode ){
		DataResponse resp = new DataResponse();
    	try {
    		List<String> listUserUid = user0102Service.getUserUidByBookID(bookCode);
    		resp.setStatus(CommonConstants.RESULT_OK);
    		resp.setListResponseData(listUserUid);
        } catch (Exception e) {
        	 e.printStackTrace();
             resp.setStatus(CommonConstants.RESULT_NG);
        }
        return ResponseEntity.ok(resp);
    }
	
//    //method này dùng bên sys ms hợp lí, khi sử dụng nên bỏ qua /sys/ để có quyền
//	@GetMapping("getBookCode/{userUid}")
//    public ResponseEntity<DataResponse> getListBookCodeOfUserUid(@PathVariable String userUid ){
//		DataResponse resp = new DataResponse();
//    	try {
//    		List<String> listUserUid = user0102Service.getBookCodeOfUserUid(userUid);
//    		resp.setStatus(CommonConstants.RESULT_OK);
//    		resp.setListResponseData(listUserUid);
//        } catch (Exception e) {
//        	 e.printStackTrace();
//             resp.setStatus(CommonConstants.RESULT_NG);
//        }
//        return ResponseEntity.ok(resp);
//    }
	
	@GetMapping("getBook")
    public ResponseEntity<DataResponse> getListBookCodeOfUserUid(HttpServletRequest request){
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
    		List<BookResponse> listBook = user0102Service.getBookCodeOfUserUid(userUid);
    		resp.setStatus(CommonConstants.RESULT_OK);
    		resp.setListResponseData(listBook);
        } catch (Exception e) {
        	 e.printStackTrace();
             resp.setStatus(CommonConstants.RESULT_NG);
        }
        return ResponseEntity.ok(resp);
    }
	
}
