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
public class NewPassword {
	@NotEmpty
    private String password;
    @NotEmpty
    private String verifyKey;
}
