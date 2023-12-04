import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AuthorDashboardComponent } from './author/author-dashboard/author-dashboard.component';
import { BooksComponent } from './author/books/books.component';
import { UploadBooksComponent } from './author/upload-books/upload-books.component';
import { AuthorProfileComponent } from './author/author-profile/author-profile.component';
import { AuthorSettingComponent } from './author/author-setting/author-setting.component';
import { AuthorContactComponent } from './author/author-contact/author-contact.component';
import { ReaderBooksComponent } from './reader-books/reader-books.component';
import { ViewReaderBookComponent } from './view-reader-book/view-reader-book.component';
import { CommunityHomepageComponent } from './community-homepage/community-homepage.component';
import { DiscusionComponent } from './discusion/discusion.component';

const routes: Routes = [
  {path: '',component:HomepageComponent},
  {path: 'home',component:HomepageComponent},
  {path: 'register',component:RegisterComponent},
{path : 'login', component :LoginComponent},
{path : 'readerbooks',component:ReaderBooksComponent},
{path:'viewreader/:id',component:ViewReaderBookComponent},
{path:'communityHome',component:CommunityHomepageComponent},
{path: 'author',component:AuthorDashboardComponent ,children: [
  {path:'',redirectTo:'author',pathMatch:'full'},
  {path:'books',component:BooksComponent},
  {path:'',component:BooksComponent},
  {path: 'uploadbooks',component:UploadBooksComponent},
  {path:'authorprofile',component:AuthorProfileComponent},
  {path:'authorsetting',component:AuthorSettingComponent},
  {path:'authorcontact',component:AuthorContactComponent},
]},
{path :'discussion/:id',component:DiscusionComponent}



  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
