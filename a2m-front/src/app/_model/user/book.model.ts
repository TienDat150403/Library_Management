import { GenreBook } from "../sys/book/genreBook.model";

export class Book {
    bookCode?: string;
    title?: string;
    publisher?: string;
    price?: number;
    pages?: number;
    description?: string;
    status?: string;
    author?: string;
    createdYear?: number;
    category?: number;
    img?: string;
    catsName?: string;
    genres?: GenreBook[];
    checked?: boolean;
    quantity?: number | 0;
    borrowDate?: Date;
    returnDateEstimate?: Date;
    returnUpdateReal?: Date;
    createdDate?: Date;
}

