package com.a2m.sso.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import com.a2m.sso.constant.CommonConstants;
import com.a2m.sso.constant.SecurityConstants;
import com.a2m.sso.model.DataResponse;
import com.a2m.sso.model.UserResponse;
import com.a2m.sso.model.req.LoginReq;
import com.a2m.sso.model.req.NewPassword;
import com.a2m.sso.model.req.SignUpReq;
import com.a2m.sso.model.req.forgotPasswordReq;
import com.a2m.sso.service.impl.UserServiceImpl;
import com.a2m.sso.util.CookieUtils;
import com.a2m.sso.util.JwtProvinderUtils;

/**
 * Author tiennd Created date 2023-07-08
 */

@RestController
@RequestMapping("api/auth")
public class AuthApiController {

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private JwtProvinderUtils jwtProvinderUtils;

	@Autowired
	private UserServiceImpl userService;

	@PostMapping("login")
	private ResponseEntity<DataResponse> login(@Valid @RequestBody LoginReq loginReq, HttpServletResponse response) {
		DataResponse resp = new DataResponse();
		try {
			Authentication authentication = authenticationManager.authenticate(
					new UsernamePasswordAuthenticationToken(loginReq.getUsername(), loginReq.getPassword()));
			SecurityContextHolder.getContext().setAuthentication(authentication);
			String jwt = jwtProvinderUtils.generateJwtByPrivateKey(authentication);
			CookieUtils.addCookie(response, SecurityConstants.ACCESS_TOKEN, jwt);
			resp.setStatus(CommonConstants.RESULT_OK);
			resp.setResponseData(jwt);
			resp.setMessage("Login success");

		} catch (BadCredentialsException e) {
			e.printStackTrace();
			resp.setStatus(CommonConstants.RESULT_NG);
			resp.setMessage("The username or password is wrong");
		} catch (DisabledException e) {
			e.printStackTrace();
			resp.setStatus(CommonConstants.RESULT_NG);
			resp.setMessage("Tài khoản chưa được xác thực");
		}
		return ResponseEntity.ok(resp);
	}

	@PostMapping("signUp")
	private ResponseEntity<DataResponse> signUp(HttpServletResponse reponse, @RequestBody SignUpReq signUpReq) {
		/*
		 * @RequestBody: @RequestBody là một annotation được sử dụng để chỉ định rằng dữ
		 * liệu được gửi lên từ client sẽ được trích xuất và chuyển đổi thành một đối
		 * tượng Java tương ứng.
		 */
		DataResponse resp = new DataResponse();
		try {
			String result = userService.saveUserDao(signUpReq);

			if (result.equals(CommonConstants.RESULT_OK)) {
				resp.setStatus(CommonConstants.RESULT_OK);
				resp.setMessage("SignUp success");
			} else if (result.equals(CommonConstants.EMAIL_EXIST)) {
				resp.setStatus(CommonConstants.RESULT_NG);
				resp.setMessage(CommonConstants.EMAIL_EXIST);
			} else if (result.equals(CommonConstants.USERNAME_EXIST)) {
				resp.setStatus(CommonConstants.RESULT_NG);
				resp.setMessage(CommonConstants.USERNAME_EXIST);
			}

		} catch (Exception e) {
			e.printStackTrace();
			String errorMessage = e.getMessage();
			resp.setStatus(CommonConstants.RESULT_NG);
			resp.setMessage(errorMessage);
		}
		return ResponseEntity.ok(resp);
	}
	
	@PostMapping("forgotPassword")
	private ResponseEntity<DataResponse> forgotPassword(HttpServletResponse reponse, @RequestBody forgotPasswordReq forgotPasswordReq){
		DataResponse resp = new DataResponse();
		
		String result = userService.forgotPassword(forgotPasswordReq);
		//kiểm tra nếu tài khoản chưa xác thực thì không cho người dùng thực hiện thao tác quên mật khẩu
		
		if(result.equals(CommonConstants.EMAIL_DONT_EXIST)) {
			resp.setStatus(CommonConstants.RESULT_NG);
			resp.setMessage(CommonConstants.EMAIL_DONT_EXIST);
		}
		else if(result.equals(CommonConstants.USERNAME_DONT_EXIST)) {
			resp.setStatus(CommonConstants.RESULT_NG);
			resp.setMessage(CommonConstants.USERNAME_DONT_EXIST);
		}
		else {
			resp.setStatus(CommonConstants.RESULT_OK);
			resp.setMessage("");
		}
		return ResponseEntity.ok(resp);
	}

	@PostMapping("changePassword")
	private ResponseEntity<DataResponse> changePassword(HttpServletResponse reponse, @RequestBody NewPassword newPassword){
		DataResponse resp = new DataResponse();
		Boolean result = userService.changePassword(newPassword);
		if(result) {
			resp.setStatus(CommonConstants.RESULT_OK);
		}
		else {
			resp.setStatus(CommonConstants.RESULT_NG);
		}
		return ResponseEntity.ok(resp);
	}

	@GetMapping("getListUserInfo/{status}")
	private ResponseEntity<List<UserResponse>> getListUserInfo(@PathVariable String status,@RequestParam(required = false) String page){
		List<UserResponse> resp = userService.getListUserInfo(status,page);
		return ResponseEntity.ok(resp);
	}

	@GetMapping("search/{userId}")
	public ResponseEntity<List<UserResponse>> searchByUserId(@PathVariable String userId){
		List<UserResponse> list= new ArrayList<>();
		try {
			list = userService.searchByUserId(userId);
		}catch (Exception e){
			System.out.println(e);
		}
		return ResponseEntity.ok(list);
	}

	@GetMapping("userInfo/{userUid}")
	private ResponseEntity<UserResponse> getUserInfoByUserUid(@PathVariable String userUid){
		UserResponse resp = userService.getUserInfoByUserUid(userUid);
		return ResponseEntity.ok(resp);
	}
}
