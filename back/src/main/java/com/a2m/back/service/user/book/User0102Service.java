package com.a2m.back.service.user.book;

import java.util.List;

import com.a2m.back.model.resp.BookResponse;
import com.a2m.back.model.resp.WaitListResponse;
import com.a2m.back.model.user.book.WishListDto;

public interface User0102Service {

	int addBookToWishList(WishListDto wishList);
	
    int deleteFromWishList(WishListDto wishList);
	
//    WaitListResponse getBookCodeOfUserUid(String userUid);
 
    List<BookResponse> getBookCodeOfUserUid(String userUid);
    
	List<String> getUserUidByBookID(String bookCode);
}
