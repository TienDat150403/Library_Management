package com.a2m.back.service.sys.impl;

import java.util.Date;
import java.util.List;

import com.a2m.back.constant.CommonConstants;
import com.a2m.back.dao.user.phieumuon.User0201DAO;
import com.a2m.back.model.resp.DataResponse;
import com.a2m.back.service.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.client.RestTemplate;

import com.a2m.back.dao.sys.Sys0101DAO;
import com.a2m.back.dao.sys.phieumuon.Sys0301DAO;
import com.a2m.back.model.resp.UserResponse;
import com.a2m.back.model.sys.EmpDto;
import com.a2m.back.service.comm.CommonService;
import com.a2m.back.service.sys.Sys0101Service;
import com.a2m.back.util.HeadersUtils;

/**
 * Author tiennd
 * Created date 2023-07-17
 */

@Service
public class Sys0101ServiceImpl implements Sys0101Service {

    @Value("${auth.api.url}")
    private String authApiUrl;

    @Autowired
    private RestTemplate rest;

    @Autowired
    private Sys0101DAO sys0101DAO;

    @Autowired
    Sys0301DAO sys0301DAO;
    @Autowired
    private CommonService commonService;
    @Autowired
    User0201DAO user0201DAO;

    @Override
    public int insert(EmpDto empDto) throws Exception {
        String userUid = commonService.getUserUid();
        empDto.setCreatedBy(userUid);
        empDto.setCreatedDate(new Date());
        int result = sys0101DAO.insert(empDto);
        return result;
    }

    @Override
    public List<UserResponse> getListUserInfo(String status,String page) {
        HttpHeaders headers = HeadersUtils.setHeaders();
        HttpEntity<List<UserResponse>> entity = new HttpEntity<>(headers);
        ResponseEntity<List<UserResponse>> responseEntity = rest.exchange(authApiUrl + "/api/auth/getListUserInfo/"+status+"?page=" + page, HttpMethod.GET, entity, new ParameterizedTypeReference<List<UserResponse>>() {
        });
        List<UserResponse> result = responseEntity.getBody();

        for (UserResponse x : result) {
            x.setSoPhieuDaTao(sys0301DAO.getQuantityPhieuOfUser(x.getUserUid()));
        }

        return result;
    }

    @Override
    public List<UserResponse> searchByUserId(String userId) {
        HttpHeaders headers = HeadersUtils.setHeaders();
        HttpEntity<List<UserResponse>> entity = new HttpEntity<>(headers);
        ResponseEntity<List<UserResponse>> responseEntity = rest.exchange(authApiUrl + "/api/auth/search/"+userId, HttpMethod.GET, entity, new ParameterizedTypeReference<List<UserResponse>>() {
        });
        List<UserResponse> result = responseEntity.getBody();
        return result;
    }

    @Override
    public UserResponse getUserInfoByUserUid(String userUid) {
        HttpHeaders headers = HeadersUtils.setHeaders();
        HttpEntity<UserResponse> entity = new HttpEntity<>(headers);
        ResponseEntity<UserResponse> responseEntity = rest.exchange(authApiUrl + "/api/auth/userInfo/" + userUid, HttpMethod.GET, entity, UserResponse.class);
        UserResponse result = responseEntity.getBody();
        result.setSoPhieuDaTao(sys0301DAO.getQuantityPhieuOfUser(result.getUserUid()));
        return result;
    }

    @Override
    public DataResponse getCountUser() {
        HttpHeaders headers = HeadersUtils.setHeaders();
        HttpEntity<Integer> entity = new HttpEntity<>(headers);
        ResponseEntity<DataResponse> responseEntity = rest.exchange(authApiUrl + "/api/user/count" , HttpMethod.GET, entity, DataResponse.class);
        DataResponse resp = new DataResponse();
        resp = responseEntity.getBody();
        return resp;
    }

    @Override
    public DataResponse diActiveUser(String USER_UID) {
        HttpHeaders headers = HeadersUtils.setHeaders();
        HttpEntity<String> entity = new HttpEntity<>(USER_UID, headers);
        DataResponse dataResponse = new DataResponse();
        int countPhieuMuonUser = user0201DAO.checkPhieuMuonExists(Long.parseLong(USER_UID));
        if(countPhieuMuonUser>0){
            dataResponse.setStatus(CommonConstants.RESULT_NG);
            dataResponse.setMessage("Hiện tại user này vẫn còn phiếu cần xác nhận hoặc phiếu chưa trả, vui lòng kiểm tra lại!");
        }else{
            dataResponse.setStatus(CommonConstants.RESULT_OK);
            ResponseEntity<DataResponse> responseEntity = rest.exchange(authApiUrl + "/api/user/disable?userUid="+USER_UID, HttpMethod.PUT, entity, DataResponse.class);
            dataResponse = responseEntity.getBody();
        }
        return dataResponse;
    }


//	
//	@Override
//    public UserResponse getUserInfo() throws Exception {
//        HttpHeaders headers = HeadersUtils.setHeaders();
//        HttpEntity<UserResponse> entity = new HttpEntity<>(headers);
//        ResponseEntity<UserResponse> responseEntity = rest.exchange(authApiUrl + "/api/user/getUserInfo", HttpMethod.GET, entity, UserResponse.class);
//        UserResponse userResponse = responseEntity.getBody();
//        String userUid = commonService.getUserUid();
//        userResponse.setRoles(userDAO.getRoleForUser(userUid));
//        return userResponse;
//    }
}
