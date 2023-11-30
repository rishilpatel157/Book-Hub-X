import { Component } from '@angular/core';
import { BookService } from 'src/app/service/book.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent {

  books! :any[]

constructor(private bookService:BookService){

this.bookService.getAuthorBooks().subscribe(res => {

  this.books = res;
  console.log(this.books)
})

}



}
