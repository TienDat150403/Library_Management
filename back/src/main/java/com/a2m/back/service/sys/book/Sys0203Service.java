package com.a2m.back.service.sys.book;

import java.util.List;

import org.springframework.stereotype.Service;

import com.a2m.back.model.sys.book.*;

public interface Sys0203Service{
	public List<Book> getBooks();
	public String checkBookExists(String bookCode);
	public void addBooksByBookCode(String bookCode, int quantity);
	public List<Book> getBooksByBookCode(String bookCode);
	public void changeBookStatus(String bookId, int status);
	public void changeBookStatusByBookCode(String bookCode, int status);
	public int getBookAvailableNumber(String bookCode);
}
