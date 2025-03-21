import { Component , OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../service/book.service';
import {MatExpansionModule} from '@angular/material/expansion';
import { saveAs } from 'file-saver';
import { UserService } from '../service/user.service';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { DialogElementsExampleDialogComponent } from '../dialog-elements-example-dialog/dialog-elements-example-dialog.component';
@Component({
  selector: 'app-view-reader-book',
  templateUrl: './view-reader-book.component.html',
  styleUrls: ['./view-reader-book.component.css']
})
export class ViewReaderBookComponent implements OnInit{

  panelOpenState = false;

  book:any


  constructor(private router :ActivatedRoute,private bookService:BookService,private userService:UserService,
    public dialog: MatDialog){}
  ngOnInit(): void {
      this.router.params.subscribe(param =>{
         const id = Number(param['id'])
         console.log(id)
       this.bookService.getBookById(id).subscribe(res =>{
        console.log(res)
        this.book =res
       })
      
        })
  }

  download(id  :number,bookName:string){

   if(this.userService.isLoggedIn()){

     
     this.bookService.downloadPdf(id).subscribe(
       (data) => this.downloadFile(data, bookName),
       (error) => console.error('Error downloading PDF:', error)
       );
      }
      else
      {
        this.dialog.open(DialogElementsExampleDialogComponent);
      }

  }
  private downloadFile(data: Blob, fileName: string) {
    const blob = new Blob([data], { type: 'application/pdf' });

    // Create a temporary anchor element
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = fileName;

    // Append the anchor to the body and trigger a click event
    document.body.appendChild(link);
    link.click();

    // Remove the anchor from the body
    document.body.removeChild(link);
  }


}
