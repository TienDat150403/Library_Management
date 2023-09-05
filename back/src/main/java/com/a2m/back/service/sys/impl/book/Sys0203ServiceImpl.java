package com.a2m.back.service.sys.impl.book;

import java.security.SecureRandom;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.a2m.back.constant.CommonConstants;
import com.a2m.back.dao.sys.book.Sys0203DAO;
import com.a2m.back.model.sys.book.*;
import com.a2m.back.service.sys.book.Sys0203Service;
@Service
public class Sys0203ServiceImpl implements Sys0203Service{
	
	@Autowired
	Sys0203DAO sys0203DAO;
	@Override
	public List<Book> getBooks(){
		List<Book> books = new ArrayList<Book>();
		books = sys0203DAO.getBooks();
		return books;
	}
	@Override
	public String checkBookExists(String bookCode) {
		String bookId = sys0203DAO.getExistBook(bookCode);
		return bookId;
	}
	@Override
	public void addBooksByBookCode(String bookCode, int quantity) {
		int existed = sys0203DAO.getBookNumber(bookCode);
		for (int i = existed + 1; i <= existed + quantity; i++) {
			sys0203DAO.addBook(bookCode + String.format("%04d", i), bookCode);
		}
	}
	@Override
	public List<Book> getBooksByBookCode(String bookCode){
		List<Book> books = new ArrayList<Book>();
		books = sys0203DAO.getBooksByBookCode(bookCode);
		for (int i = 0; i < books.size(); i++) {
			books.get(i).setIsAvailable(sys0203DAO.checkBookAvailable(books.get(i).getBookId()));
//			System.out.println(books.get(i).getBookId() + " " + books.get(i).getIsAvailable());
		}
		return books;
	}
	@Override
	public void changeBookStatus(String bookId, int status) {
		Book book = new Book();
		book.setBookId(bookId);
		book.setStatus(status);
		sys0203DAO.changeBookStatus(book);
	}
	@Override
	public void changeBookStatusByBookCode(String bookCode, int status) {
		Book book = new Book();
		book.setBookCode(bookCode);
		book.setStatus(status);
		sys0203DAO.changeBookStatusByBookCode(book);
	}
	@Override
	public int getBookAvailableNumber(String bookCode) {
		return sys0203DAO.getBookAvailableNumber(bookCode);
	}

}