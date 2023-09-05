import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'genreFormat'
})
export class GenreFormatPipe implements PipeTransform {
  transform(genres: String[]): String {
    return genres.join(', ');
  }
}