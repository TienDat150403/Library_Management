package com.a2m.back.controller.pub;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.a2m.back.constant.CommonConstants;
import com.a2m.back.dao.sys.book.Sys0202DAO;
import com.a2m.back.model.resp.DataResponse;
import com.a2m.back.model.resp.GenreBookResponse;
import com.a2m.back.model.resp.UserResponse;
import com.a2m.back.model.sys.book.BookTitle;
import com.a2m.back.service.sys.book.Sys0201Service;
import com.a2m.back.service.user.UserService;

@RestController
@RequestMapping("api/public")
public class PubApiController {
	@Autowired
	private UserService userService;

	@Autowired
	Sys0201Service sys0201Service;

	@Autowired
	Sys0202DAO sys0202DAO;
//	 @PostMapping("setRole")
//	    public ResponseEntity<String> setRole(@RequestBody String userUid) {
//	    	String resp = "";
//	        try {
//	        	userService.setRole(userUid);
//	        	resp = CommonConstants.RESULT_OK;
//	        } catch (Exception e) {
//	            e.printStackTrace();
//	            resp = CommonConstants.RESULT_NG;
//	        }
//	        return ResponseEntity.ok(resp);
//	    }

	@GetMapping("getBookTitle")
	public ResponseEntity<DataResponse> getBookTitle(@RequestParam(value = "search", required = false) String search,
			@RequestParam(value = "page", required = false) int page,
			@RequestParam(value = "category", required = false) String category, //đây là id
			@RequestParam(value = "categoryByName", required = false) String categoryByName,
			@RequestParam(value = "author", required = false) String author,
			@RequestParam(value = "listCategory", required = false) int[] listCategory,
			@RequestParam(value = "listAuthor", required = false) String[] listAuthor) {
		DataResponse resp = new DataResponse();
		try {
			List<BookTitle> result = sys0201Service.getBooksLimit(page + "", search, category, author, listCategory, listAuthor, categoryByName);
			resp.setListResponseData(result);
			;
			resp.setStatus(CommonConstants.RESULT_OK);
		} catch (Exception e) {
			e.printStackTrace();
			resp.setStatus(CommonConstants.RESULT_NG);
		}
		return ResponseEntity.ok(resp);
	}

	@GetMapping("get/{bookCode}")
	public ResponseEntity<DataResponse> getBookInfo(@PathVariable String bookCode) {
		DataResponse resp = new DataResponse();
		try {
			BookTitle book = sys0201Service.getBookInfo(bookCode);
			resp.setResponseData(book);
			resp.setStatus(CommonConstants.RESULT_OK);
		} catch (Exception e) {
			e.printStackTrace();
			resp.setStatus(CommonConstants.RESULT_NG);
		}
		return ResponseEntity.ok(resp);
	}

	@GetMapping("getBookTitleSearch")
	public ResponseEntity<DataResponse> getBookTitleSearch(@RequestParam("search") String search,
			@RequestParam("page") int page) {
		DataResponse resp = new DataResponse();
		try {
			List<BookTitle> result = sys0201Service.getBooksSearch(search, page);
			resp.setListResponseData(result);
			;
			resp.setStatus(CommonConstants.RESULT_OK);
		} catch (Exception e) {
			e.printStackTrace();
			resp.setStatus(CommonConstants.RESULT_NG);
		}
		return ResponseEntity.ok(resp);
	}

	// @GetMapping("getBookTitleSearch")
//	public ResponseEntity<DataResponse> getBookTitleSearch(@RequestParam("search") String search, @RequestParam("page") int page) {
//        DataResponse resp = new DataResponse();
//        try {
//        	List<BookTitle> result = sys0201Service.getBooksSearch(search, page);
//        	resp.setListResponseData(result);;
//        	resp.setStatus(CommonConstants.RESULT_OK);
//        } catch (Exception e) {
//            e.printStackTrace();
//            resp.setStatus(CommonConstants.RESULT_NG);
//        }
//        return ResponseEntity.ok(resp);
//    }
//	

	@GetMapping("getGenreList")
	public ResponseEntity<DataResponse> getGenreList() {
		DataResponse resp = new DataResponse();
		try {
			List<GenreBookResponse> result = sys0202DAO.getAllGenres();
			resp.setResponseData(result);
			resp.setStatus(CommonConstants.RESULT_OK);
		} catch (Exception e) {
			e.printStackTrace();
			resp.setStatus(CommonConstants.RESULT_NG);
		}
		return ResponseEntity.ok(resp);
	}

	@GetMapping("countTotalBookTitle")
	public ResponseEntity<DataResponse> countTotalBookTitle(@RequestParam("search") String search,
			@RequestParam("category") String category, @RequestParam("listAuthor") String[] listAuthor,
			@RequestParam(value = "author", required = false) String author,
			@RequestParam(value = "categoryByName", required = false) String categoryByName) {
		DataResponse resp = new DataResponse();
		try {
			int result = sys0201Service.countTotalBookTitle(search, category, listAuthor, author, categoryByName);
			resp.setResponseData(result);
			;
			resp.setStatus(CommonConstants.RESULT_OK);
		} catch (Exception e) {
			e.printStackTrace();
			resp.setStatus(CommonConstants.RESULT_NG);
		}
		return ResponseEntity.ok(resp);
	}

//	@GetMapping("get/cover/{fileName}")
//	public ResponseEntity<DataResponse> getBookTitleByGenre(@PathVariable int genre_id,
//			@RequestParam(value = "page", required = false) int page) {
//        DataResponse resp = new DataResponse();
//        try {
//            List<BookTitle> result = sys0201Service.getBookTitleByGenre(genre_id, page);
//            resp.setResponseData(result);
//            ;
//            resp.setStatus(CommonConstants.RESULT_OK);
//        } catch (Exception e) {
//            e.printStackTrace();
//            resp.setStatus(CommonConstants.RESULT_NG);
//        }
//        return ResponseEntity.ok(resp);
//    }
	@GetMapping("/get/cover/{fileName}")
	public ResponseEntity<DataResponse> getBookCover(@PathVariable String fileName) {
		DataResponse resp = new DataResponse();
		try {
			String base64Image = sys0201Service.getBookCover(fileName);
		    resp.setStatus(CommonConstants.RESULT_OK);
			resp.setResponseData(base64Image);
			
		} catch (Exception e) {
          e.printStackTrace();
          resp.setStatus(CommonConstants.RESULT_NG);
		}
		return ResponseEntity.ok(resp);
	}

	@GetMapping("get/genre/{genre_id}")
	public ResponseEntity<DataResponse> getBookTitleByGenre(@PathVariable int genre_id,
			@RequestParam(value = "page", required = false) int page) {
		DataResponse resp = new DataResponse();
		try {
			List<BookTitle> result = sys0201Service.getBookTitleByGenre(genre_id, page);
			resp.setResponseData(result);
			;
			resp.setStatus(CommonConstants.RESULT_OK);
		} catch (Exception e) {
			e.printStackTrace();
			resp.setStatus(CommonConstants.RESULT_NG);
		}
		return ResponseEntity.ok(resp);
	}
	
	@GetMapping("get/author")
	public ResponseEntity<DataResponse> getAuthor() {
		DataResponse resp = new DataResponse();
		try {
			List<String> result = sys0201Service.getAuthor();
			resp.setResponseData(result);
			;
			resp.setStatus(CommonConstants.RESULT_OK);
		} catch (Exception e) {
			e.printStackTrace();
			resp.setStatus(CommonConstants.RESULT_NG);
		}
		return ResponseEntity.ok(resp);
	}
}
