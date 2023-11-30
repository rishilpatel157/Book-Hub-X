import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomepageComponent } from './homepage/homepage.component';
import { FooterComponent } from './footer/footer.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AuthorDashboardComponent } from './author/author-dashboard/author-dashboard.component';
import { BooksComponent } from './author/books/books.component';
import { UploadBooksComponent } from './author/upload-books/upload-books.component';
import { AuthorProfileComponent } from './author/author-profile/author-profile.component';
import { AuthorSettingComponent } from './author/author-setting/author-setting.component';
import { AuthorContactComponent } from './author/author-contact/author-contact.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomepageComponent,
    FooterComponent,
    RegisterComponent,
    LoginComponent,
    AuthorDashboardComponent,
    BooksComponent,
    UploadBooksComponent,
    AuthorProfileComponent,
    AuthorSettingComponent,
    AuthorContactComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
