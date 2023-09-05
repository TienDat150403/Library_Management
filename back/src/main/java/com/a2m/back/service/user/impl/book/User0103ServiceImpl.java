package com.a2m.back.service.user.impl.book;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.a2m.back.dao.user.book.User0103DAO;
import com.a2m.back.model.resp.GenreBookResponse;
import com.a2m.back.service.user.book.User0103Service;

@Service
public class User0103ServiceImpl implements User0103Service {
	@Autowired
	User0103DAO user0101DAO;

	@Override
	public List<GenreBookResponse> getListGenreBookForUserUid(String userUid) {
		List<GenreBookResponse> result = user0101DAO.getListGenreBookForUserUid(userUid);
		return result;
	}

}
