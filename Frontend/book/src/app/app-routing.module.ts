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

const routes: Routes = [
  {path: '',component:HomepageComponent},
  {path: 'home',component:HomepageComponent},
  {path: 'register',component:RegisterComponent},
{path : 'login', component :LoginComponent},
{path: 'author',component:AuthorDashboardComponent ,children: [
  {path:'',redirectTo:'author',pathMatch:'full'},
  {path:'books',component:BooksComponent},
  {path:'',component:AuthorProfileComponent},
  {path: 'uploadbooks',component:UploadBooksComponent},
  {path:'authorprofile',component:AuthorProfileComponent},
  {path:'authorsetting',component:AuthorSettingComponent},
  {path:'authorcontact',component:AuthorContactComponent}

  
]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
