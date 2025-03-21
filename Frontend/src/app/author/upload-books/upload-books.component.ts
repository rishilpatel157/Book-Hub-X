import { Component } from '@angular/core';
import { BooksDto } from 'src/app/book';
import { BookService } from 'src/app/service/book.service';
import { concatMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-upload-books',
  templateUrl: './upload-books.component.html',
  styleUrls: ['./upload-books.component.css']
})
export class UploadBooksComponent {

  constructor(private bookService :BookService){}

  books :any={
    title: "",
    description: "",
    genres: "",
   imageLink :"",
  }

  imageLink! :string
  imageSelected! : File
  bookSelected! : File

  

  onImageSelected(event :any){
    console.log(event)

    this.imageSelected = event.target.files[0];

  }

  onBookSelected(event :any){
    this.bookSelected = event.target.files[0];

  }

  onSubmit(){

alert("uploaded")
  //   this.bookService.uploadBook( this.books)
  // .subscribe(
  //   res => {
  //     console.log(res);
  //   },
  //   error => {
  //     console.error('Error uploading book:', error);
  //     // Handle the error as needed, e.g., show an error message to the user
  //   }
  // );

    

  // }
  const bookData = this.books; // Replace with your logic to prepare book data
  const imageFile = this.imageSelected; // Replace with your logic to get image file
  const pdfFile = this.bookSelected; // Replace with your logic to get PDF file


  this.bookService.uploadBook(bookData)
  .pipe(
    concatMap((bookResponse) =>
    
    this.bookService.uploadBookImage(imageFile, bookResponse).pipe(
        
        tap(() => console.log('Image uploaded successfully')),
        concatMap(() => this.bookService.uploadBookPDF(pdfFile, bookResponse))
        )
        )
        )
  .subscribe(
    () => {
      console.log('PDF uploaded successfully');
      // Additional logic after all uploads
    },
    (error) => {
      console.error('Error during upload:', error);
      // Handle error
    }
  );
}
}