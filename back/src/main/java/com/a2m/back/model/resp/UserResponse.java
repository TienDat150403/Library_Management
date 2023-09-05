package com.a2m.back.model.resp;

import com.a2m.back.model.Role;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

/**
 * Author tiennd
 * Created date 2023-07-08
 */

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UserResponse implements Serializable {

    private static final long serialVersionUID = 12L;

    private String userUid;
    private String userId;
    @JsonIgnore
    private String pwd;
    private Date createdDate;
    private String createdBy;
    private Date pwdExpr;
    private int soPhieuDaTao;
    private String updatedBy;
    private Date updatedDate;
    private String status;
    private Long userInfoId;
    private String email;
    private String cellPhone;
    private Date dob;
    private String fullName;
    private String address;
    private boolean gender;
    private String imgPath;
    private boolean twoFAEnable;
    @JsonIgnore
    private String twoFAKey;
    @JsonIgnore
    private String emailVerifyKey;
    private List<Role> roles;
    private String authProvider;
    private String organization;
    private String position;
}
