package com.a2m.sso.service;

public interface MailService {

	void sendEmail(String verifyKey, String redirectUri, String mailTo);
	
	void sendMailUpdatePassword(String verifyKey, String redirectUri, String mailTo);
}
