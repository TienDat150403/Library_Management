package com.a2m.back.model.sys.book;

import com.a2m.back.model.Role;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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
public class Book {
	private String bookId;
	private String bookCode;
	private int status;
	private int isAvailable;
}
