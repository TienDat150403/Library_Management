package com.a2m.sso.model.req;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotEmpty;

/**
 * Author tiennd
 * Created date 2023-07-08
 */

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LoginReq {
    @NotEmpty
    private String username;
    @NotEmpty
    private String password;
}
