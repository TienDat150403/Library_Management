package com.a2m.sso.model.req;

import javax.validation.constraints.NotEmpty;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SignUpReq {
	private String userUid;
	@NotEmpty
	private String username;
	@NotEmpty
	private String password;
	@NotEmpty
	private String email;
	@NotEmpty
	private String fullname;
//	private String status;
	private String redirectUri;
	private String verifyKey;
}
