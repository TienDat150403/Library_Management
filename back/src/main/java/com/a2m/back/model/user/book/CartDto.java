package com.a2m.back.model.user.book;

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
public class CartDto {
	private static final long serialVersionUID = 12L;

	@NotNull
    private String userUid;
	@NotNull
    private String bookCode;
}
