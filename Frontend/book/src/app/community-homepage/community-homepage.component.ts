import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { CreateCommunityComponent } from '../dialog/create-community/create-community.component';
import { CommunityService } from '../service/community.service';
import { UserService } from '../service/user.service';
import {  Router } from '@angular/router';
import { DialogElementsExampleDialogComponent } from '../dialog-elements-example-dialog/dialog-elements-example-dialog.component';


@Component({
  selector: 'app-community-homepage',
  templateUrl: './community-homepage.component.html',
  styleUrls: ['./community-homepage.component.css'],
})
export class CommunityHomepageComponent implements OnInit {
  title!: string;
  bookId!: string;
  community: any[] = [];
  

  role: string[] = [];
  roles: string[] = [];
  member: boolean[] = [];
  user: any = {
    id: -1,
    firstName: '',
    lastName: '',
    email: '',
  };

  currentPage = 0;
  pageSize = 5;
  totalPages = 0;
  pages: number[] = [];

  constructor(
    public dialog: MatDialog,
    private communityService: CommunityService,
    private userService: UserService,
    private route :Router,
    
  ) {}

  openDialog() {
    if(this.userService.isLoggedIn()){

      const dialogRef = this.dialog.open(CreateCommunityComponent, {
        data: { title: this.title, bookId: this.bookId },
      });
      
      dialogRef.afterClosed().subscribe((result) => {
        console.log(result);
        
        this.communityService
        .createCommunity(result.title, result.bookId)
        .subscribe((res) => {
          alert(res);
          console.log(res);
          
          window.location.reload();
        });
      });
    }
    else
    {
      this.dialog.open(DialogElementsExampleDialogComponent)

    }
  
    }
    
    ngOnInit(): void {
    this.userService.getUser().subscribe((res) => {
      this.user = res;
    });
    this.loadItems();
  }
  
  loadItems(): void {
    this.communityService
      .getPagedItems(this.currentPage, this.pageSize)
      .subscribe((page) => {
        this.community = page.content;
        console.log(this.community);

        for (let i = 0; i < this.community.length; i++) {
          for (let j = 0; j < this.community[i].members.length; j++) {
            console.log(this.user.id, this.community[i].members[j].id);
            if (this.user.id == this.community[i].members[j].id) {
              this.member[i] = true;
              break;
            }
          }
        }
        console.log(this.member);
        this.community.forEach(
          (i, index) => (this.role[index] = i.creator.authority[0].role)
        );
        const roles = this.role.map((role) => role.replace('ROLE_', ''));

        this.roles = roles;

        this.totalPages = page.totalPages;
        this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);

        // Log the data after the asynchronous call is complete
      });
  }

  onPageChange(newPage: number): void {
    // Adjust the condition based on your indexing
    if (newPage >= 1 && newPage - 1 < this.totalPages) {
      // this.member = false
      this.currentPage = newPage;
      this.loadItems();
    }
  }

  joinCommunity(id: number) {

    this.communityService.joinCommunity(id).subscribe((res) => {
      console.log(res);
      this.route.navigate(['/discussion',id])
    });
  }
}
