package com.a2m.back.service.sys.impl.book;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.security.SecureRandom;
import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.a2m.back.dao.sys.book.Sys0201DAO;
import com.a2m.back.dao.sys.book.Sys0202DAO;
import com.a2m.back.dao.sys.book.Sys0203DAO;
import com.a2m.back.model.sys.book.BookTitle;
import com.a2m.back.model.sys.book.GenreBookDto;
import com.a2m.back.service.sys.book.Sys0201Service;
import com.a2m.back.service.sys.book.Sys0203Service;

@Service
public class Sys0201ServiceImpl implements Sys0201Service {

	@Autowired
	Sys0201DAO sys0201DAO;

	@Autowired
	Sys0202DAO sys0202DAO;

	@Autowired
	Sys0203DAO sys0203DAO;

	@Autowired
	Sys0203Service sys0203Service;

	@Override
	public List<BookTitle> getBooks() {
		List<BookTitle> books = new ArrayList<BookTitle>();
		books = sys0201DAO.getBooks();
		for (int i = 0; i < books.size(); i++) {
			books.get(i).setQuantity(sys0201DAO.countBooksAvailable(books.get(i).getBookCode()));
		}
		return books;
	}

	@Override
	public List<BookTitle> getBooksLimit(String page, String search, String category, String author, int[] listCategory,
			String[] listAuthor, String categoryByName) {
		List<BookTitle> books = new ArrayList<BookTitle>();
		if (category.equals("0")) {
			category = "";

		}
		if (categoryByName == null) {
			categoryByName = "";

		}
		int startIndex = (Integer.parseInt(page) - 1) * 12;

		books = sys0201DAO.getBooksLimit(((Integer.parseInt(page)) - 1) * 12, search, category, listAuthor, author, categoryByName);

		for (BookTitle x : books) {
			x.setQuantity(sys0203DAO.getBookAvailableNumber(x.getBookCode()));
		}
//		List<BookTitle> result = new ArrayList<BookTitle>();
//		for(BookTitle x : books) {
//			if(listAuthor.length > 0) {
//				for(String searchAuthor: listAuthor) {
//					if(x.getAuthor().equalsIgnoreCase(searchAuthor)) {
//						x.setQuantity(sys0203DAO.getBookAvailableNumber(x.getBookCode()));
//						result.add(x);
//					}
//				}
//			}
//			
//		}
//		

		Collections.sort(books, new Comparator<BookTitle>() {
			@Override
			public int compare(BookTitle book1, BookTitle book2) {
				return Integer.compare(book2.getQuantity(), book1.getQuantity());
			}
		});

		if (startIndex + 12 < books.size()) {
			return books.subList(startIndex, startIndex + 12);
		} else {
			return books.subList(startIndex, books.size());
		}
	}

	@Override
	public List<BookTitle> getBooksSearch(String search, int page) {
		List<BookTitle> books = new ArrayList<BookTitle>();
		books = sys0201DAO.getBooksSearch(search, (page - 1) * 12);
		return books;
	}

//	@Override
//	public boolean updateBook(BookTitle book) {
//		BookTitle oldBook = sys0201DAO.getBookInfo(book.getBookCode());
//		
//		if (sys0201DAO.checkBookExist(book) == 0) {
//			sys0201DAO.updateBook(book);
//			return true;
//		}
//		return false;
//	}
	@Override
	public boolean updateBook(BookTitle book) {

		if (sys0201DAO.checkBookExist(book) == 0) {
			sys0201DAO.updateBook(book);
			sys0201DAO.deleteBookGenre(book.getBookCode());
			List<GenreBookDto> genres = book.getGenres();
			for (int i = 0; i < genres.size(); i++) {
				sys0201DAO.addBookGenre(book.getBookCode(), genres.get(i).getGenre_id());
			}
			return true;
		}
		return false;
	}

	@Override
	public BookTitle getBookInfo(String bookCode) {
		BookTitle book = sys0201DAO.getBookInfo(bookCode);
		book.setQuantity(sys0203DAO.getBookAvailableNumber(book.getBookCode()));
		book.setGenres(sys0202DAO.getGenreByBookCode(bookCode));
		book.setQuantity(sys0201DAO.countBooksAvailable(book.getBookCode()));
		return book;
	}

	public String genBookCode() {
		String CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		int KEY_LENGTH = 4;
		SecureRandom secureRandom = new SecureRandom();
		StringBuilder sb = new StringBuilder(KEY_LENGTH);
		sb = new StringBuilder(KEY_LENGTH);
		while (sb.length() < KEY_LENGTH) {
			int randomIndex = secureRandom.nextInt(CHARACTERS.length());
			char randomChar = CHARACTERS.charAt(randomIndex);
			sb.append(randomChar);
		}
		return sb.toString();
	}

	@Override
	public BookTitle addBookTitle(BookTitle book, int quantity) {
		try {
			if (sys0201DAO.checkBookExist(book) == 0) {
				book.setBookCode(genBookCode());
				book.setDateAdd(new Date());
				while (sys0201DAO.getBookInfo(book.getBookCode()) != null)
					book.setBookCode(genBookCode());
				sys0201DAO.addBookTitle(book);
				List<GenreBookDto> genres = book.getGenres();
				for (int i = 0; i < genres.size(); i++) {
					sys0201DAO.addBookGenre(book.getBookCode(), genres.get(i).getGenre_id());
				}
				sys0203Service.addBooksByBookCode(book.getBookCode(), quantity);
				return book;
			}
			return new BookTitle();
		} catch (Exception e) {
			e.printStackTrace();
			return new BookTitle();
		}
	}

	@Override
	public void changeStatus(String bookCode, int status) {
		BookTitle book = new BookTitle();
		book.setBookCode(bookCode);
		book.setStatus(status);
		sys0201DAO.changeStatus(book);
	}

	@Override
	public int countTotalBookTitle(String search, String category, String[] listAuthor, String author, String categoryByName) {
		if (category.equals("0")) {
			category = "";

		}
		if (categoryByName == null) {
			categoryByName = "";

		}

		int result = 0;

		result = sys0201DAO.countTotalBookTitle(search, category, listAuthor, author, categoryByName);

		return result;
	}

	@Override
	public List<BookTitle> getBookTitleByGenre(int genre_id, int page) {
		int ignore = (page - 1) * 5;
		List<BookTitle> listBookTitle = sys0201DAO.getBookTitleByGenre(genre_id, ignore);

//		books = sys0201DAO.getBooksLimit(((Integer.parseInt(page)) - 1) * 12, search, category, author);
		for (BookTitle x : listBookTitle) {
			x.setQuantity(sys0203DAO.getBookAvailableNumber(x.getBookCode()));
		}
		return listBookTitle;
	}

	@Override
	public void addBookCover(MultipartFile file, String bookCode) {
		try {
			Path root = Paths.get("src/main/resources/assets/images/book");
			String originalFileName = file.getOriginalFilename();
			File directory = new File("src/main/resources/assets/images/book");
			File[] filesInDirectory = directory.listFiles();
			if (filesInDirectory != null) {
				for (File file1 : filesInDirectory) {
					if (file1.getName().contains(bookCode)) {
						file1.delete();
					}
				}
			}
			int dotIndex = originalFileName.lastIndexOf(".");
			String fileExtension = originalFileName.substring(dotIndex, originalFileName.length());
			String newFileName = bookCode + fileExtension;
			sys0201DAO.addCover(newFileName, bookCode);
			System.out.println(newFileName);
//			String directoryPath = "./src/main/resources/assets/images/";
			Files.copy(file.getInputStream(), root.resolve(newFileName));
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	@Override
	public String getBookCover(String fileName) {
		String base64Image = "";
		try {
			Path imagePath = null;
			if (fileName.equals("no-image.png"))
				imagePath = Paths.get("src/main/resources/assets/images/no-image.png");
			else
				imagePath = Paths.get("src/main/resources/assets/images/book/" + fileName);
			byte[] imageBytes = Files.readAllBytes(imagePath);
			base64Image = Base64.getEncoder().encodeToString(imageBytes);
			return base64Image;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return base64Image;
	}

	@Override
	public List<String> getAuthor() {
		List<String> listAuthor = sys0201DAO.getAuthor();
		return listAuthor;
	}

//	@Override
//	public Resource getBookCover(String bookCode) {
//		
//	}

//	public void addBookGenre (String bookCode, int[] genre_id) {
//		for (int i = 0; i < genre_id.length; i++) {
//			System.out.println(genre_id[i]);
//		}
//	}
}