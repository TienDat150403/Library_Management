package com.a2m.back.service.user.book;

import java.util.List;

import com.a2m.back.model.resp.BookResponse;
import com.a2m.back.model.user.book.CartDto;

public interface User0101Service {
	int insert(CartDto cartDto);
	
	int delete(CartDto cartDto);
	
	List<BookResponse> getListBookInCart(String userUid);
}
