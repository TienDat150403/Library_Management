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

import com.a2m.back.constant.CommonConstants;
import com.a2m.back.model.resp.DataResponse;
import com.a2m.back.model.sys.EmpDto;
import com.a2m.back.model.sys.book.Book;
import com.a2m.back.model.sys.book.BookTitle;
import com.a2m.back.service.sys.book.Sys0203Service;

@RestController
@RequestMapping("api/admin/sys0203")
public class Sys0203Controller {
	
	@Autowired
	Sys0203Service sys0203Service;
	
	@GetMapping("get")
    public ResponseEntity<DataResponse> getBooks() {
        DataResponse resp = new DataResponse();
        try {
        	List<Book> result = sys0203Service.getBooks();
        	resp.setResponseData(result);
        	resp.setStatus(CommonConstants.RESULT_OK);
        } catch (Exception e) {
            e.printStackTrace();
            resp.setStatus(CommonConstants.RESULT_NG);
        }
        return ResponseEntity.ok(resp);
    }
	
	@PostMapping("add/{bookCode}")
	public ResponseEntity<DataResponse> addBooks(@PathVariable String bookCode, @RequestParam int quantity) {
        DataResponse resp = new DataResponse();
        try {
        	sys0203Service.addBooksByBookCode(bookCode, quantity);
        	resp.setStatus(CommonConstants.RESULT_OK);
        } catch (Exception e) {
            e.printStackTrace();
            resp.setStatus(CommonConstants.RESULT_NG);
        }
        return ResponseEntity.ok(resp);
    }
	
	@GetMapping("get/{bookCode}")
	public ResponseEntity<DataResponse> getBooksByBookCode(@PathVariable String bookCode) {
        DataResponse resp = new DataResponse();
        try {
        	List<Book> result = sys0203Service.getBooksByBookCode(bookCode);
        	resp.setResponseData(result);
        	resp.setStatus(CommonConstants.RESULT_OK);
        } catch (Exception e) {
            e.printStackTrace();
            resp.setStatus(CommonConstants.RESULT_NG);
        }
        return ResponseEntity.ok(resp);
    }
	
	@PutMapping("status/{bookId}")
	public ResponseEntity<DataResponse> changeBookStatus(@PathVariable String bookId, @RequestParam int status) {
	     DataResponse resp = new DataResponse();
	        try {
	        	sys0203Service.changeBookStatus(bookId, status);
	        	resp.setStatus(CommonConstants.RESULT_OK);
	        } catch (Exception e) {
	            e.printStackTrace();
	            resp.setStatus(CommonConstants.RESULT_NG);
	        }
	        return ResponseEntity.ok(resp);
   }
	
//	@PutMapping("/status/{bookCode}")
//	public ResponseEntity<DataResponse> changeBookStatusByBookCode(@PathVariable String bookCode, @RequestParam int status) {
//	     DataResponse resp = new DataResponse();
//	        try {
//	        	sys0203Service.changeBookStatusByBookCode(bookCode, status);
//	        	resp.setStatus(CommonConstants.RESULT_OK);
//	        } catch (Exception e) {
//	            e.printStackTrace();
//	            resp.setStatus(CommonConstants.RESULT_NG);
//	        }
//	        return ResponseEntity.ok(resp);
//	}
	
	@GetMapping("get/available/{bookCode}")
	public ResponseEntity<DataResponse> getBookAvailableNumber(@PathVariable String bookCode) {
        DataResponse resp = new DataResponse();
        try {
        	int result = sys0203Service.getBookAvailableNumber(bookCode);
        	resp.setResponseData(result);
        	resp.setStatus(CommonConstants.RESULT_OK);
        } catch (Exception e) {
            e.printStackTrace();
            resp.setStatus(CommonConstants.RESULT_NG);
        }
        return ResponseEntity.ok(resp);
    }
}