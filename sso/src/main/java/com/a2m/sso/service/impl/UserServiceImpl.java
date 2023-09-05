package com.a2m.sso.service.impl;

import java.sql.SQLException;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.a2m.sso.constant.CommonConstants;
import com.a2m.sso.dao.UserDAO;
import com.a2m.sso.model.UserResponse;
import com.a2m.sso.model.req.NewPassword;
import com.a2m.sso.model.req.SignUpReq;
import com.a2m.sso.model.req.forgotPasswordReq;
import com.a2m.sso.service.ComSeqService;
import com.a2m.sso.service.UserService;

@Service
public class UserServiceImpl implements UserService {
	
	@Autowired
	private ComSeqService comSeq;

	@Autowired
	private UserDAO userDAO;

	@Autowired
	PasswordEncoder passwordEncoder;
	
	@Autowired
	CommonServiceImpl commonServiceImpl;

	@Autowired
	private MailServiceImpl mailService;
	
	

	@Override
	public UserResponse getUserInfo() throws Exception {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
		UserResponse userResponse = userDetails.getUser();
//		System.out.println(userResponse.getImgPath());
		return userResponse;
	}

	@Override
	public void updateUserInfo(UserResponse userResponse) throws Exception {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
		String userUid = userDetails.getUser().getUserUid();
		userResponse.setUpdatedDate(new Date());
		userResponse.setUserUid(userUid);
		userDAO.updateUserInfoByUserUid(userResponse);
		commonServiceImpl.clearCacheUser(userUid);
	}

	@Override
	public void diActiveUser(String USER_UID) {
		userDAO.diActiveUser(USER_UID);
	}

	@Override
	public String saveUserDao(SignUpReq user) {

		// validate
		if (userDAO.isEmailExists(user.getEmail())) {
			return CommonConstants.EMAIL_EXIST;
		} else if (userDAO.isUsernameExists(user.getUsername())) {
			return CommonConstants.USERNAME_EXIST;
		} else {
			String userUid = "";
			String verifyKey = getVerifyKey();
			try {
				userUid = comSeq.getSeq(CommonConstants.SEQ_NAME);
				System.out.println(userUid);
			} catch (SQLException e) {
				e.printStackTrace();
			}
//			HttpEntity<String> entity = new HttpEntity<>(userUid);
//			ResponseEntity<String> responseEntity = rest.exchange(backApiUrl + "/api/public/setRole", HttpMethod.POST, entity, String.class);
			
//			if(responseEntity.getBody().equals(CommonConstants.RESULT_NG)) {
//				return CommonConstants.RESULT_NG;
//			}
			user.setPassword(passwordEncoder.encode(user.getPassword()));
			user.setUserUid(userUid);
			user.setVerifyKey(verifyKey);

			userDAO.insertUser(user);
			userDAO.insertUserInfo(user);
			
			mailService.sendEmail(user.getVerifyKey(), user.getRedirectUri(), user.getEmail());
			return CommonConstants.RESULT_OK;
		}
	}
	

	@Override
	public void verifyUser(String verifyKey) {

		userDAO.updateStatusUser(verifyKey);
//		userDAO.updateVerifyKeyNull(verifyKey);
	}
	


	@Override
	public boolean isActivate(String user_id) {
		if (userDAO.isActivate(user_id)) {
			return true;
		}
		return false;
	}

	@Override
	public String forgotPassword(forgotPasswordReq forgotPasswordReq) {
		if (!userDAO.isEmailExists(forgotPasswordReq.getEmail())) {
			return CommonConstants.EMAIL_DONT_EXIST;
		} else if (!userDAO.isUsernameExists(forgotPasswordReq.getUsername())) {
			return CommonConstants.USERNAME_DONT_EXIST;
		} else {
			String verifyKey = getVerifyKey();
			// update verifyKey
			Map<String, Object> params = new HashMap<>();
			params.put("verifyKey", verifyKey);
			params.put("user_id", forgotPasswordReq.getUsername());
			params.put("expiredKey", new Date());
			userDAO.updateVerifyKeyByUserId(params);

			String mailTo = ""; // lấy mail bằng user_id

			mailService.sendMailUpdatePassword(verifyKey, forgotPasswordReq.getRedirectUri(), forgotPasswordReq.getEmail());
			return CommonConstants.RESULT_OK;
		}
	}

	public String getVerifyKey() {
		UUID uuid = UUID.randomUUID();
		return uuid.toString();
	}

	@Override
	public boolean changePassword(NewPassword newPass) {
		//có thể có lỗi verifyKey không có trong db, try catch exception
		// chưa hết hạn
		if (!isExpiredKey(newPass.getVerifyKey())) {
			newPass.setPassword(passwordEncoder.encode(newPass.getPassword()));
			userDAO.updatePasswordByVerifyKey(newPass);
			userDAO.updateVerifyKeyNull(newPass.getVerifyKey());
			return true;
		} else {
			return false;
		}
	}
	// Nếu cập nhật thông tin user thì phải xóa thông tin user đã lưu cache
	// Dùng @CacheEvict("user") tham số là userUid
	// Gọi func clearCacheUser trong CommonService

	@Override
	public boolean isExpiredKey(String verifyKey) {
		if (userDAO.isExpiredKey(verifyKey)) {
			return true;
		} else {
			return false;
		}
	}
	
	@Override
	public List<UserResponse> getListUserInfo(String status, String page) {
		List<UserResponse> result = userDAO.getListUserInfo(status,(Integer.parseInt(page)-1) * 10);
		return result;
	}

	@Override
	public UserResponse getUserInfoByUserUid(String userUid) {
		UserResponse result = userDAO.getUserInfoByUserUid(userUid);
		return result;
	}

	@Override
	public List<UserResponse> searchByUserId(String USER_ID) {
		//lúc merge về thì nó chỉ như này, bị lỗi nen sửa tạm thành như bên dưới;
//		List<UserResponse> result = userDAO.searchByUserId(USER_ID);

		List<UserResponse> result = userDAO.searchByUserId(USER_ID);
		return result;
	}

	@Override
	public Integer getCountUser(String status) {
		return userDAO.getCountUser(status);
	}

	@Override
	public void addUserCover(String fileName) {
		try {
			Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
			UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
			String userUid = userDetails.getUser().getUserUid();
			userDAO.addUserCover(fileName, Long.parseLong(userUid));
			commonServiceImpl.clearCacheUser(userUid);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

}
