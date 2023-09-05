package com.a2m.back.model.resp;

import java.util.Date;
import java.util.List;

import com.a2m.back.model.sys.book.GenreBookDto;
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
public class BookResponse {
	private String bookCode;
	private String title;
	private String publisher;
	private int price;
	private int pages;
	private String description;
	private String status;
	private String author;
	private String catsName;
	private int createdYear;
	private int category;
	private String img;
	private int quantity;
	private String book_id;
	private List<GenreBookDto> genres;
	private Date dateAdd;
}
