package com.a2m.back.model.user.book;

import java.util.Date;

import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class WishListDto {
	private static final long serialVersionUID = 12L;
    private String userUid;
	@NotNull
    private String bookCode;
	private Date date_add;

}
