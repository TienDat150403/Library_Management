package com.a2m.sso.model.req;

import java.util.Date;

import javax.validation.constraints.NotEmpty;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class forgotPasswordReq {
	@NotEmpty
    private String username;
    @NotEmpty
    private String email;
    private String redirectUri;
}
