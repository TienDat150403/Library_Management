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
public class BookTitle {
	private String bookCode;
	private String title;
	private String publisher;
	private int price;
	private int pages;
	private String description;
	private int status;
	private String author;
	private int createdYear;
	private int category;
	private List<GenreBookDto> genres;
	private String img;
	private int quantity;
	private Date dateAdd;

}
