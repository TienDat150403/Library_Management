package com.a2m.back.dao.sys.book;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.a2m.back.model.resp.GenreBookResponse;
import com.a2m.back.model.sys.book.GenreBookDto;

@Mapper
public interface Sys0202DAO {
	
	int insert(GenreBookDto cateBook);
	
	int update(GenreBookDto cateBook);
	
	List<GenreBookResponse> getListCateBook(int ignore, String name);
	
	GenreBookResponse getCateBookByGenreId(String genreId);
	
	boolean checkGenreBookExist(String genre_name);

	List<GenreBookDto> getGenreByBookCode(String bookCode);
	
	List<GenreBookResponse> getAllGenres();
	int countTotalGenreBook(String status, String name);
	
}
