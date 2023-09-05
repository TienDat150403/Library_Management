package com.a2m.back.model.resp;

import java.util.Date;

import javax.validation.constraints.NotNull;

import com.a2m.back.model.sys.book.BookTitle;
import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class NotificationResponse {
	private static final long serialVersionUID = 12L;
	private int notification_id;
    private String userUid;
	@NotNull
    private String content;
	private Date date_add;
	private String about;
	private Boolean isRead;
	private String id;
	private BookTitle book;
	private phieumuonResponse phieuMuon;
}
