import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { BookService } from 'src/app/service/book.service';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
})
export class BooksComponent {
  books!: any[];
  profilePictureData: ArrayBuffer | null = null;
  profilePictureBase64: string | null = null;

  constructor(private bookService: BookService) {
    this.bookService.getAuthorBooks().subscribe((res) => {
      this.books = res;
    });
  }

  publishBook(id: number) {

    this.bookService.publishBook(id).subscribe(res =>{
      alert(res)
    })

    this.bookService.getAuthorBooks().subscribe((res) => {
      this.books = res;
      console.log(res)
    });
    window.location.reload()


  }
  unPublishBook(id: number) {
    this.bookService.unpublishBook(id).subscribe(res =>{
      alert(res)
    })
    this.bookService.getAuthorBooks().subscribe((res) => {
      this.books = res;
    });
    window.location.reload()

  }

  deleteBook(id: number) {

    this.bookService.deleteBook(id).subscribe(res =>{
      alert(res)
    })
    this.bookService.getAuthorBooks().subscribe((res) => {
      this.books = res;
    });
    window.location.reload()


  }
}
