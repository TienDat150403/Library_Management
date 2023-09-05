package com.a2m.back.controller.sys.Book;

import java.util.ArrayList;
import java.util.List;

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
import com.a2m.back.dao.sys.book.Sys0202DAO;
import com.a2m.back.model.resp.DataResponse;
import com.a2m.back.model.resp.GenreBookResponse;
import com.a2m.back.model.sys.book.GenreBookDto;
import com.a2m.back.service.sys.book.Sys0202Service;

@RestController
@RequestMapping("api/admin/sys0202")
public class Sys0202Controller {

	@Autowired
	Sys0202Service sys0202Service;
	
	@Autowired
	Sys0202DAO sys0202DAO;
	
	@PostMapping("insert")
    public ResponseEntity<DataResponse> insert(@RequestBody GenreBookDto cateBook){
		DataResponse resp = new DataResponse();
		try {
            int result = sys0202Service.insert(cateBook);
            if(result == 1) {
            	resp.setStatus(CommonConstants.RESULT_OK);
                resp.setResponseData(cateBook);
            }
            else {
            	resp.setStatus(CommonConstants.RESULT_NG);
            	resp.setMessage("Loại sách đã tồn tại!");
            }
            
        } catch (Exception e) {
            e.printStackTrace();
            resp.setStatus(CommonConstants.RESULT_NG);
        }
        return ResponseEntity.ok(resp);
    }
	
	@PutMapping("update")
    public ResponseEntity<DataResponse> update(@RequestBody GenreBookDto cateBook){
		DataResponse resp = new DataResponse();
		try {
			int result = sys0202Service.update(cateBook);
            if(result == 1) {
            	resp.setStatus(CommonConstants.RESULT_OK);
                resp.setResponseData(cateBook);
                resp.setMessage("Cập nhật thành công!");
            }
            else if(result == 0){
            	resp.setStatus(CommonConstants.RESULT_NG);
            	resp.setMessage("Loại sách đã tồn tại!");
            }
//            else if(result == 2){
//            	resp.setStatus(CommonConstants.RESULT_NG);
//            	resp.setMessage("Tồn tại đầu sách có thể loại như trên đang hoạt động!");
//            }
        } catch (Exception e) {
            e.printStackTrace();
            resp.setStatus(CommonConstants.RESULT_NG);
        }
        return ResponseEntity.ok(resp);
    }
	
	@GetMapping("genreBook")
    public ResponseEntity<DataResponse<GenreBookResponse>> getListCateBookLimit( @RequestParam("page") int page,
			@RequestParam("name") String name){
		DataResponse resp = new DataResponse();
        List<GenreBookResponse> list = new ArrayList<GenreBookResponse>();
    	try {
    		list = sys0202Service.getListCateBook(page + "", name);
    		resp.setStatus(CommonConstants.RESULT_OK);
    		resp.setListResponseData(list);
        } catch (Exception e) {
        	e.printStackTrace();
            resp.setStatus(CommonConstants.RESULT_NG);
        }
        return ResponseEntity.ok(resp);
    }
	

	@GetMapping("getGenreList")
	public ResponseEntity<DataResponse> getGenreList(){
		DataResponse resp = new DataResponse();
        try {
        	List<GenreBookResponse> result = sys0202DAO.getAllGenres();
        	resp.setResponseData(result);
        	resp.setStatus(CommonConstants.RESULT_OK);
        }catch (Exception e) {
            e.printStackTrace();
            resp.setStatus(CommonConstants.RESULT_NG);
        }
        return ResponseEntity.ok(resp);
	}

	
	
	@GetMapping("genreBook/{genreId}")
    public ResponseEntity<GenreBookResponse> getUserInfoByUserUid(@PathVariable String genreId){
		GenreBookResponse resp = new GenreBookResponse();
    	try {
    		resp = sys0202Service.getCateBookByGenreId(genreId);
        } catch (Exception e) {

        }
        return ResponseEntity.ok(resp);
	}
	
	@GetMapping("countTotalGenreBook")
	public ResponseEntity<DataResponse> countTotalGenreBook(@RequestParam("status") String status,
			@RequestParam("name") String name){
		DataResponse resp = new DataResponse();
		try {
        	int result = sys0202Service.countTotalGenreBook(status, name);
        	resp.setResponseData(result);;
        	resp.setStatus(CommonConstants.RESULT_OK);
        } catch (Exception e) {
            e.printStackTrace();
            resp.setStatus(CommonConstants.RESULT_NG);
        }
        return ResponseEntity.ok(resp);
	}
}
