package com.a2m.back.service.sys.book;

import java.util.List;

import com.a2m.back.model.resp.GenreBookResponse;
import com.a2m.back.model.sys.book.GenreBookDto;

public interface Sys0202Service {

	int insert(GenreBookDto cateBook);
	
	int update(GenreBookDto cateBook);
	
	List<GenreBookResponse> getListCateBook(String page, String name);
	
	GenreBookResponse getCateBookByGenreId(String genreId);
	
	int countTotalGenreBook(String status, String name);
	

}
