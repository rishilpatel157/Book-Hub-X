import { Component,OnInit } from '@angular/core';
import { BookService } from '../service/book.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reader-books',
  templateUrl: './reader-books.component.html',
  styleUrls: ['./reader-books.component.css']
})
export class ReaderBooksComponent implements OnInit{


  bookList: any[] = [];

currentPage = 0;
pageSize = 10;
totalPages = 0;
pages: number[] = [];

constructor(private bookService: BookService, private router:Router) {}

ngOnInit(): void {
  this.loadItems();
}

loadItems(): void {
  this.bookService.getPagedItems(this.currentPage, this.pageSize).subscribe((page) => {
    this.bookList = page.content;
    console.log(this.bookList)
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

viewBook(id:number){
  this.router.navigate(['/viewreader',id])

}


}
