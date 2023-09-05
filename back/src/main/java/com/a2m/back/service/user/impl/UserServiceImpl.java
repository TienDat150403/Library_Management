package com.a2m.back.service.user.impl;

import java.io.File;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import com.a2m.back.constant.CommonConstants;
import com.a2m.back.dao.user.UserDAO;
import com.a2m.back.dao.user.phieumuon.User0201DAO;
import com.a2m.back.model.Role;
import com.a2m.back.model.resp.DataResponse;
import com.a2m.back.model.resp.UserResponse;
import com.a2m.back.service.comm.CommonService;
import com.a2m.back.service.user.UserService;
import com.a2m.back.util.HeadersUtils;

//import kr.a2m.slo.service.impl.LogoutServiceImpl;

/**
 * Author tiennd Created date 2023-07-15
 */

@Service
public class UserServiceImpl implements UserService {

    @Value("${auth.api.url}")
    private String authApiUrl;

    @Autowired
    private RestTemplate rest;

    @Autowired
    private CommonService commonService;

//    @Autowired
//    private LogoutServiceImpl logoutService;

    @Autowired
    private UserDAO userDAO;
    @Autowired
    User0201DAO user0201DAO;


    @Override
    public UserResponse getUserInfo() throws Exception {
        HttpHeaders headers = HeadersUtils.setHeaders();
        HttpEntity<UserResponse> entity = new HttpEntity<>(headers);
        ResponseEntity<UserResponse> responseEntity = rest.exchange(authApiUrl + "/api/user/getUserInfo",
                HttpMethod.GET, entity, UserResponse.class);
        UserResponse userResponse = responseEntity.getBody();
        String userUid = commonService.getUserUid();
        List<Role> roles = userDAO.getRoleForUser(userUid);
        userResponse.setRoles(roles);
        return userResponse;
    }

    @Override
    public DataResponse updateUserInfo(UserResponse userResponse) throws Exception {
        HttpHeaders headers = HeadersUtils.setHeaders();
        HttpEntity<UserResponse> entity = new HttpEntity<>(userResponse, headers);
        ResponseEntity<DataResponse> responseEntity = rest.exchange(authApiUrl + "/api/user/updateUserInfo",
                HttpMethod.POST, entity, DataResponse.class);
        DataResponse dataResponse = responseEntity.getBody();
        return dataResponse;
    }

    @Override
    public DataResponse diActiveUser(String USER_UID) {
        HttpHeaders headers = HeadersUtils.setHeaders();
        HttpEntity<String> entity = new HttpEntity<>(USER_UID, headers);
        DataResponse dataResponse = new DataResponse();
        int countPhieuMuonUser = user0201DAO.checkPhieuMuonExists(Long.parseLong(USER_UID));
        if (countPhieuMuonUser > 0) {
            dataResponse.setStatus(CommonConstants.RESULT_NG);
            dataResponse.setMessage("Hiện tại user này vẫn còn phiếu cần xác nhận hoặc phiếu chưa trả, vui lòng kiểm tra lại!");
        } else {
            ResponseEntity<DataResponse> responseEntity = rest.exchange(authApiUrl + "/api/user/disable?userUid=" + USER_UID, HttpMethod.PUT, entity, DataResponse.class);
            dataResponse = responseEntity.getBody();
        }
        return dataResponse;
    }

    @Override
    public Integer countUser(String status) {
        HttpHeaders headers = HeadersUtils.setHeaders();
        HttpEntity<String> entity = new HttpEntity<>(status, headers);
        ResponseEntity<Integer> responseEntity = rest.exchange(authApiUrl + "/api/user/count?status=" + status, HttpMethod.GET, entity, Integer.class);
        int totalUsers = responseEntity.getBody();
        return totalUsers;
    }

    @Override
    public int logout() throws Exception {
        return 0;
    }

//    @Override
//    public int logout() throws Exception {
//        String userUid = commonService.getUserUid();
//        return logoutService.logout(userUid);
//    }

    @Override
    public List<Role> getRoles() throws Exception {
        String userUid = commonService.getUserUid();
        List<Role> roles = userDAO.getRoleForUser(userUid);
        return roles;
    }

	@Override
	public void setRole(String userUid) throws Exception {
		userDAO.setRole(userUid);
		
		commonService.clearCacheRole(userUid);
	}
	
	@Override
	public String getUserCover(String fileName) {
		String base64Image = "";
		try {
			Path imagePath = null;
			if (fileName.equals("no-image.png")) imagePath = Paths.get("src/main/resources/assets/images/no-image.png");
			else imagePath = Paths.get("src/main/resources/assets/images/user/" + fileName);
		    byte[] imageBytes = Files.readAllBytes(imagePath);
		    base64Image = Base64.getEncoder().encodeToString(imageBytes);
		    return base64Image;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return base64Image;
	}
	
	@Override
	public void addUserCover(MultipartFile file) {
		try {
			String userUid = commonService.getUserUid();
			Path root = Paths.get("src/main/resources/assets/images/user");
			String originalFileName = file.getOriginalFilename();
			File directory = new File("src/main/resources/assets/images/user");
	        File[] filesInDirectory = directory.listFiles();
			if (filesInDirectory != null) {
	            for (File file1 : filesInDirectory) {
	                if (file1.getName().contains(userUid)) {
	                    file1.delete();
	                }
	            }
			}
			int dotIndex = originalFileName.lastIndexOf(".");
	        String fileExtension = originalFileName.substring(dotIndex, originalFileName.length());
	        String newFileName = userUid + fileExtension;
	        HttpHeaders headers = HeadersUtils.setHeaders();
	        HttpEntity<UserResponse> entity = new HttpEntity<>(headers);
	        Map<String, String> urlVariables = new HashMap<>();
	        urlVariables.put("newFileName", newFileName);
	        ResponseEntity<DataResponse> responseEntity = rest.exchange(authApiUrl + "/api/user/cover/add/{newFileName}", HttpMethod.POST, entity, DataResponse.class, urlVariables);
	        System.out.println(newFileName);
//			String directoryPath = "./src/main/resources/assets/images/";
            Files.copy(file.getInputStream(), root.resolve(newFileName));
        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
    }


    // Nếu cập nhật role của user thì phải xóa thông tin roles đã lưu cache
    // Dùng @CacheEvict("role") tham số là userUid
    // Gọi func clearCacheRole trong CommonService
}
