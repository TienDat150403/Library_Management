package com.a2m.back.controller.sys.Book;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.a2m.back.constant.CommonConstants;
import com.a2m.back.model.resp.DataResponse;
import com.a2m.back.model.sys.EmpDto;
import com.a2m.back.model.sys.book.BookTitle;
 import com.a2m.back.service.sys.book.Sys0201Service;

@RestController
@RequestMapping("api/admin/sys0201")
public class Sys0201Controller {
	
	@Autowired
	Sys0201Service sys0201Service;
	//test 0908
	@GetMapping("get")
    public ResponseEntity<DataResponse> getBooks() {
        DataResponse resp = new DataResponse();
        try {
        	List<BookTitle> result = sys0201Service.getBooks();
        	resp.setResponseData(result);
        	resp.setStatus(CommonConstants.RESULT_OK);
        } catch (Exception e) {
            e.printStackTrace();
            resp.setStatus(CommonConstants.RESULT_NG);
        }
        return ResponseEntity.ok(resp);
    }
	
	@PutMapping("update")
	public ResponseEntity<DataResponse> updateBook(@RequestBody BookTitle book){
	DataResponse resp = new DataResponse();
		try {
			if (sys0201Service.updateBook(book) == true) {
	        	resp.setStatus(CommonConstants.RESULT_OK);
			}
			else {
				resp.setStatus(CommonConstants.RESULT_NG);
			}
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
	
	@PostMapping("add")
    public ResponseEntity<DataResponse> addBook(@RequestBody BookTitle book, @RequestParam int quantity) {
     DataResponse resp = new DataResponse();
        try {
        	BookTitle res = sys0201Service.addBookTitle(book, quantity);
        	if (res.getBookCode() != null) {
        		resp.setStatus(CommonConstants.RESULT_OK);
        		resp.setResponseData(res);
        	}
        	else resp.setStatus(CommonConstants.RESULT_NG);
        } catch (Exception e) {
            e.printStackTrace();
            resp.setStatus(CommonConstants.RESULT_NG);
        }
        return ResponseEntity.ok(resp);
    }
	
	@PostMapping("add/cover")
    public ResponseEntity<DataResponse> addBookCover(@RequestParam("file") MultipartFile file, @RequestParam("bookCode") String bookCode) {
     DataResponse resp = new DataResponse();
        try {
        	sys0201Service.addBookCover(file, bookCode);
        	resp.setStatus(CommonConstants.RESULT_OK);
        } catch (Exception e) {
            e.printStackTrace();
            resp.setStatus(CommonConstants.RESULT_NG);
        }
        return ResponseEntity.ok(resp);
    }
	
	
	@PutMapping("status/{bookCode}")
	public ResponseEntity<DataResponse> disableBookTitle(@PathVariable String bookCode, @RequestParam int status) {
	     DataResponse resp = new DataResponse();
	        try {
	        	sys0201Service.changeStatus(bookCode, status);
	        	resp.setStatus(CommonConstants.RESULT_OK);
	        } catch (Exception e) {
	            e.printStackTrace();
	            resp.setStatus(CommonConstants.RESULT_NG);
	        }
	        return ResponseEntity.ok(resp);
    }
	
//	@PutMapping("/addgenre/{bookCode}")
//	public ResponseEntity<DataResponse> addBookGenre(@PathVariable String bookCode, @RequestBody int[] genre_id) {
//	     DataResponse resp = new DataResponse();
//	        try {
//	        	sys0201Service.addBookGenre(bookCode, genre_id);
//	        	resp.setStatus(CommonConstants.RESULT_OK);
//	        } catch (Exception e) {
//	            e.printStackTrace();
//	            resp.setStatus(CommonConstants.RESULT_NG);
//	        }
//	        return ResponseEntity.ok(resp);
//   }
}