package com.a2m.back.service.user.book;

import java.util.List;

import com.a2m.back.model.resp.GenreBookResponse;

public interface User0103Service {

	List<GenreBookResponse> getListGenreBookForUserUid(String userUid);
}
