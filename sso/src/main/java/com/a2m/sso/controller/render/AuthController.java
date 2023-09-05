package com.a2m.sso.controller.render;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.client.RestTemplate;

import com.a2m.sso.constant.CommonConstants;
import com.a2m.sso.constant.SecurityConstants;
import com.a2m.sso.model.UserResponse;
import com.a2m.sso.service.ComSeqService;
import com.a2m.sso.service.impl.UserServiceImpl;
import com.a2m.sso.util.CookieUtils;
import com.a2m.sso.util.JwtProvinderUtils;

/**
 * Author tiennd
 * Created date 2023-07-09
 */

@Controller
@RequestMapping("auth")
public class AuthController {

    @Autowired
    private JwtProvinderUtils jwtProvinderUtils;
    
    @Autowired
    private UserServiceImpl userService;
    
    @Autowired
    private ComSeqService comSeq;
    
    @Autowired
	private RestTemplate rest;

    @GetMapping("login")
    public String login(@RequestParam String redirectUri, 
    		@RequestParam(required = false) String actionType,
    		HttpServletRequest request, 
    		Model model, HttpServletResponse response) {

//    	try {
//			String userUid = comSeq.getSeq(CommonConstants.SEQ_NAME);
//			System.out.println(userUid);
//		} catch (SQLException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}
    	
        model.addAttribute(SecurityConstants.REDIRECT_URI_KEY, redirectUri);

        if (CommonConstants.ACTION_LOGOUT_TYPE.equals(actionType)) {
            CookieUtils.deleteCookieByName(SecurityConstants.ACCESS_TOKEN, request, response);
            return "login/login";
        }

        String accessToken = CookieUtils.getCookieByName(SecurityConstants.ACCESS_TOKEN, request);
        try {
            if (accessToken != null && jwtProvinderUtils.validateJwtToken(accessToken) && !jwtProvinderUtils.hasTokenExpired(accessToken)) {
                String url = redirectUri + "?" + SecurityConstants.ACCESS_TOKEN + "=" + accessToken;
                return "redirect:" + url;
            } else {
                return "login/login";
            }
        } catch (Exception e) {
            e.printStackTrace();	
            CookieUtils.deleteCookieByName(SecurityConstants.ACCESS_TOKEN, request, response);
            return "login/login";
        }
    }

    @GetMapping("sign-up")
    public String signUp(@RequestParam String redirectUri, Model model) {
        model.addAttribute(SecurityConstants.REDIRECT_URI_KEY, redirectUri);
//        System.out.println(model.getAttribute(SecurityConstants.REDIRECT_URI_KEY));
        return "login/sign-up";
    }
    
    @GetMapping("noticeSuccess")
    public String noticeSuccess(@RequestParam String redirectUri, Model model) {
    	model.addAttribute("url", "/auth/login?actionType=logout&redirectUri=" + redirectUri);
    	model.addAttribute("title", "Bạn đã đăng ký tài khoản thành công, Xin vui lòng xác nhận tài khoản tại địa chỉ email ...");
    	model.addAttribute("btnTitle", "Đăng nhập");
    	return "notice/success";
    }
    
    @GetMapping("noticeWarn")
    public String noticeWarn(@RequestParam String redirectUri, Model model) {
    	model.addAttribute("url", "/auth/login?redirectUri=" + redirectUri);
    	model.addAttribute("title", "Tài khoản chưa được xác thực, Xin vui lòng xác nhận tài khoản tại địa chỉ email ...");
    	model.addAttribute("btnTitle", "Đăng nhập");
    	return "notice/warn";
    }
    
    @GetMapping("noticeForgotPass")
    public String noticeForotPass(@RequestParam String redirectUri, Model model) {
    	model.addAttribute("url", "/auth/login?redirectUri=" + redirectUri);
    	model.addAttribute("title", "Link xác thực để đổi mật khẩu đã được gửi tại địa chỉ email, Xin vui lòng xác nhận tại địa chỉ ...");
    	model.addAttribute("btnTitle", "Đăng nhập");
    	return "notice/warn";
    }
    
    @GetMapping("verify")
    public String verify(HttpServletRequest request, Model model){
    	
    	String verifyKey = request.getParameter("verifyKey");
    	String redirectUri = request.getParameter("redirectUri");
    	userService.verifyUser(verifyKey);
    	model.addAttribute(SecurityConstants.REDIRECT_URI_KEY, redirectUri);
    	return "login/login";
    }
    
    @GetMapping("forgotPassword")
    public String forgotPassword(@RequestParam String redirectUri, Model model){
        model.addAttribute(SecurityConstants.REDIRECT_URI_KEY, redirectUri);

    	return "forgotPassword/forgotPassword";
    }
    
    @GetMapping("newPassword")
    public String newPassword1(HttpServletRequest request, Model model, HttpServletResponse response){
    	String verifyKey = request.getParameter("verifyKey");
    	
    	String redirectUri = request.getParameter("redirectUri");
    	
    	if(userService.isExpiredKey(verifyKey)) {	
    		model.addAttribute("url", "/auth/login?redirectUri=" + redirectUri);
        	model.addAttribute("title", "Link đổi mật khẩu đã hết hạn...");
        	model.addAttribute("btnTitle", "Đăng nhập");
        	return "notice/warn";
    	}
    	else {
    		model.addAttribute(SecurityConstants.REDIRECT_URI_KEY, redirectUri);
            model.addAttribute("verifyKey", verifyKey);
            return "forgotPassword/newPassword";
    	}
    }
}
