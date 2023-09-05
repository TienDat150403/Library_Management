package com.a2m.back.dao.user.book;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.a2m.back.model.resp.BookResponse;
import com.a2m.back.model.user.book.CartDto;

@Mapper
public interface User0101DAO {
	int insert(CartDto cartDto);
	
	int delete(CartDto cartDto);
	
	List<BookResponse> getListBookInCart(String userUid);
	
	boolean checkBookExistInCart(CartDto cartDto);
}
