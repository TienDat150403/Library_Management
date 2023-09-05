package com.a2m.back.dao.user.book;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.a2m.back.model.resp.BookResponse;
import com.a2m.back.model.user.book.WishListDto;

@Mapper
public interface User0102DAO {
	int addBookToWishList(WishListDto wishList);

	int deleteFromWishList(WishListDto wishList);
	
	List<String> getUserUidByBookID(String bookCode);
	
//	WaitListResponse getBookCodeOfUserUid(String userUid);
	
	List<BookResponse> getBookCodeOfUserUid(String userUid);
	
	boolean checkBookInWishListByUserUid(WishListDto wishList);
	
	List<String> getUserUidByBookCode(String bookCode);
}
