package com.a2m.back.service.sys.book;

import java.util.List;

import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.a2m.back.model.sys.book.*;

public interface Sys0201Service{
	public List<BookTitle> getBooks();
	List<BookTitle> getBooksLimit(String page, String search, 
			String category, String author, 
			int[] listCategory, String[] listAuthor, String categoryByName);

	List<BookTitle> getBooksSearch(String search, int page);
	public boolean updateBook(BookTitle book);
	public BookTitle getBookInfo(String bookCode);
	public BookTitle addBookTitle(BookTitle book, int quantity);
	public void changeStatus (String bookCode, int status);
	public List<BookTitle> getBookTitleByGenre(int genre_id, int page);
	public void addBookCover(MultipartFile file, String bookCode);
//	public Resource getBookCover(String bookCode);
	public int countTotalBookTitle(String search, String category, String[] listAuthor, String author, String categoryByName);
	public List<String> getAuthor();
	public String getBookCover(String fileName);

}
