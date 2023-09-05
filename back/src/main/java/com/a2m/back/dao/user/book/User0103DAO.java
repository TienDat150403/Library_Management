package com.a2m.back.dao.user.book;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.a2m.back.model.resp.GenreBookResponse;
@Mapper
public interface User0103DAO {
	List<GenreBookResponse> getListGenreBookForUserUid(String userUid);

}
