package com.a2m.back.model.sys;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.Date;

/**
 * Author tiennd
 * Created date 2023-07-17
 */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class EmpDto {
    private Long id;
    @NotEmpty
    private String fullName;
    @NotNull
    private Boolean gender;
    private Date dob;
    private String address;
    private String createdBy;
    private String updatedBy;
    private Date createdDate;
    private Date updatedDate;
}
