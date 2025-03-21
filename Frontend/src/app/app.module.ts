import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatRadioModule } from '@angular/material/radio';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { DatePipe } from '@angular/common';



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
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReaderBooksComponent } from './reader-books/reader-books.component';
import { ViewReaderBookComponent } from './view-reader-book/view-reader-book.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDialogModule} from '@angular/material/dialog';
import { DialogElementsExampleDialogComponent } from './dialog-elements-example-dialog/dialog-elements-example-dialog.component';
import { CommunityHomepageComponent } from './community-homepage/community-homepage.component';
import { CreateCommunityComponent } from './dialog/create-community/create-community.component';
import { DiscusionComponent } from './discusion/discusion.component';
import { ChatbotComponent } from './chatbot/chatbot.component';



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
    AuthorContactComponent,
    ReaderBooksComponent,
    ViewReaderBookComponent,
    DialogElementsExampleDialogComponent,
    CommunityHomepageComponent,
    CreateCommunityComponent,
    DiscusionComponent,
    ChatbotComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    BrowserAnimationsModule,
    MatTooltipModule,
    MatRadioModule,
    MatExpansionModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
  
    
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
