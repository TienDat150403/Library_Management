package com.a2m.sso.service.impl;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import com.a2m.sso.constant.SecurityConstants;
import com.a2m.sso.service.MailService;

@Service
public class MailServiceImpl implements MailService {

	@Autowired
	private JavaMailSender mailSender;
	
	@Override
	public void sendEmail(String verifyKey, String redirectUri, String mailTo) {

		MimeMessage message = mailSender.createMimeMessage();
		try {
			MimeMessageHelper helper = new MimeMessageHelper(message, true);

			String link = "http://localhost:8097/auth/" + "verify" + "?redirectUri=" + redirectUri + "&verifyKey=" + verifyKey;
			
//			helper.setTo("ngalee2002@gmail.com");
			helper.setTo(mailTo);
			helper.setSubject("Confirm your email");
			String htmlContent = "<html>" + "<body>" + "Xin chào," + "<br><br>"
			        + "<input type=\"hidden\" th:value=\"${redirectUri}\" id=\"redirectUri\">"
			        + "<input type=\"hidden\" th:value=\"${verifyKey}\" id=\"verifyKey\">"
					+ "Nhấp vào nút bên dưới kích hoạt tài khoản:" + "<br><br>" + "<a href=\""
					+ link + "\">"
					+ "<button id=\"nga\" style=\"background-color:blue; color:white; padding: 10px;\">Verify</button>" + "</a>"
					+ "</body>" + "</html>";
			helper.setText(htmlContent, true);
			
			mailSender.send(message);
		} catch (MessagingException e) {
			e.printStackTrace();
		}

	}


	@Override
	public void sendMailUpdatePassword(String verifyKey, String redirectUri, String mailTo) {
		MimeMessage message = mailSender.createMimeMessage();
		try {
			MimeMessageHelper helper = new MimeMessageHelper(message, true);

			String link = "http://localhost:8097/auth/" + "newPassword" + "?redirectUri=" + redirectUri + "&verifyKey=" + verifyKey;
//			String link = "http://localhost:8097/auth/" + "newPassword" + "?redirectUri=" + redirectUri;

			helper.setTo("ngalee2002@gmail.com");
//			helper.setTo(mailTo);
			helper.setSubject("Confirm your email");
			String htmlContent = "<html>" + "<body>" + "Xin chào," + "<br><br>"
			        + "<input type=\"hidden\" th:value=\"${redirectUri}\" id=\"redirectUriTh\">"
			        + "<input type=\"hidden\" id=\"verifyKey\" value=\"" + verifyKey + "\">"
					+ "Nhấp vào nút bên dưới kích hoạt tài khoản:" + "<br><br>" + "<a href=\""
					+ link + "\">"
					+ "<button id=\"nga\" style=\"background-color:blue; color:white; padding: 10px;\">Verify</button>" + "</a>"
					+ "</body>" + "</html>";
			helper.setText(htmlContent, true);
			
			mailSender.send(message);
		} catch (MessagingException e) {
			e.printStackTrace();
		}
	}

}
