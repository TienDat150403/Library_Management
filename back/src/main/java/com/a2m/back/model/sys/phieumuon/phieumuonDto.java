package com.a2m.back.model.sys.phieumuon;

import com.a2m.back.model.sys.book.BookTitle;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotNull;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class phieumuonDto {
    private int idPhieuMuon;
    @NotNull
    private Long user_uid;
    private Long fine;
    @NotNull
    private Date createdDate;
    private Date borrowDate;
    private Date returnDateEstimate;
    private Date returnUpdateReal;
    private Date cancelDate;
    @NotNull
    private int status;
    private int extended_times;
    private List<BookTitle> listBook;
}
