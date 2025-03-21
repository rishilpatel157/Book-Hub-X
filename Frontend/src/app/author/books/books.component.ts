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
  
currentPage = 0;
pageSize = 10;
totalPages = 0;
pages: number[] = [];


  constructor(private bookService: BookService) {
  this.loadItems();
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

  loadItems(): void {
    this.bookService.getAuthorPagedItems(this.currentPage, this.pageSize).subscribe((page) => {
      this.books = page.content;
      console.log(this.books)
      this.totalPages = page.totalPages;
      this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
      
      // Log the data after the asynchronous call is complete
    });
  }
  
  onPageChange(newPage: number): void {
    // Adjust the condition based on your indexing
    
    if (newPage >= 1 && newPage-1 < this.totalPages) {
      this.currentPage = newPage;
      this.loadItems();
    }
  }
}
