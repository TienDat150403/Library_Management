package com.a2m.back.service.sys.impl.book;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.a2m.back.dao.sys.book.Sys0201DAO;
import com.a2m.back.dao.sys.book.Sys0202DAO;
import com.a2m.back.model.resp.GenreBookResponse;
import com.a2m.back.model.sys.book.BookTitle;
import com.a2m.back.model.sys.book.GenreBookDto;
import com.a2m.back.service.sys.book.Sys0202Service;

@Service
public class Sys0202ServiceImpl implements Sys0202Service{

	@Autowired
	Sys0202DAO sys0202DAO;
	
	@Autowired
	Sys0201DAO sys0201DAO;
	
	@Override
	public int insert(GenreBookDto cateBook) {
		if(!sys0202DAO.checkGenreBookExist(cateBook.getGenre_name())) {
			int result = sys0202DAO.insert(cateBook);
			return 1;
		}
		return 0;
	}


	@Override
	public int update(GenreBookDto cateBook) {
		GenreBookResponse bookOld = new GenreBookResponse();
		bookOld = sys0202DAO.getCateBookByGenreId(cateBook.getGenre_id());
		if(!bookOld.getGenre_name().equals(cateBook.getGenre_name())){
			if(sys0202DAO.checkGenreBookExist(cateBook.getGenre_name())) {
				return 0; //đã tồn tại thể loại sách đó
			}
		}
//		List<BookTitle> listBookTitle = sys0201DAO.getBookTitleByGenre(Integer.parseInt(cateBook.getGenre_id()));
//		for(BookTitle x : listBookTitle) {
//			if(x.getStatus() == 1) {
//				return 2; //có đầu sách đang hoạt động
//			}
//		}
//		int result = sys0202DAO.update(cateBook);
		return 1;
	}
	@Override
	public List<GenreBookResponse> getListCateBook(String page, String name) {
		List<GenreBookResponse> result = sys0202DAO.getListCateBook(((Integer.parseInt(page)) - 1) * 10, name);
		return result;
	}
	@Override
	public GenreBookResponse getCateBookByGenreId(String genreId) {
		GenreBookResponse result = sys0202DAO.getCateBookByGenreId(genreId);
		return result;
	}


	@Override
	public int countTotalGenreBook(String status, String name) {
		int result = sys0202DAO.countTotalGenreBook(status, name);
		return result;
	}




	
}
