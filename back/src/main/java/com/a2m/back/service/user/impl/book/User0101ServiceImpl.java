package com.a2m.back.service.user.impl.book;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.a2m.back.dao.sys.book.Sys0203DAO;
import com.a2m.back.dao.user.book.User0101DAO;
import com.a2m.back.model.resp.BookResponse;
import com.a2m.back.model.sys.book.BookTitle;
import com.a2m.back.model.user.book.CartDto;
import com.a2m.back.service.user.book.User0101Service;

@Service
public class User0101ServiceImpl implements User0101Service{

	@Autowired
	User0101DAO user0101DAO;
	
	@Autowired
	Sys0203DAO sys0203DAO;
	
	@Override
	public int insert(CartDto cartDto) {
		if(user0101DAO.checkBookExistInCart(cartDto)) {
			return 0;
		}
		else if(sys0203DAO.getBookAvailableNumber(cartDto.getBookCode()) == 0) {
			return 2;
		}
		else {
			int result = user0101DAO.insert(cartDto);
			return 1;
		}
	}

	@Override
	public int delete(CartDto cartDto) {
		if(user0101DAO.checkBookExistInCart(cartDto)) {
			int delete = user0101DAO.delete(cartDto);
			return 1;
		}
		return 0;
	}

	@Override
	public List<BookResponse> getListBookInCart(String userUid) {
		List<BookResponse> listBook = user0101DAO.getListBookInCart(userUid);
		for(BookResponse x : listBook) {
			x.setQuantity(sys0203DAO.getBookAvailableNumber(x.getBookCode()));
		}
		return listBook;
	}

}
