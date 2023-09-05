package com.a2m.back.dao.sys.book;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.a2m.back.model.sys.book.*;
@Mapper
public interface Sys0203DAO{
	List<Book> getBooks();
	String getExistBook(String bookCode);
	int getBookNumber(String bookCode);
	void addBook(String bookId, String bookCode);
	List<Book> getBooksByBookCode(String bookCode);
	void changeBookStatus(Book book);
	void changeBookStatusByBookCode(Book book);
	int getBookAvailableNumber(String bookCode);
	int checkBookAvailable(String bookId);
}

