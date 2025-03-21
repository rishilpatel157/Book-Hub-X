import { Component,Inject,OnInit } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { CommunityCreate } from '../community-create';
import { BookService } from 'src/app/service/book.service';

@Component({
  selector: 'app-create-community',
  templateUrl: './create-community.component.html',
  styleUrls: ['./create-community.component.css']
})
export class CreateCommunityComponent implements OnInit{

  books:any[] = []

  constructor(  public dialogRef: MatDialogRef<CreateCommunityComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CommunityCreate,private bookService:BookService
  ) {
    
    
  }

  onBookSelectionChange(id: number){
    this.data.bookId = id
    
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
      this.bookService.getAllBook().subscribe(res => {
        this.books = res
       
      })
  }

  





}
