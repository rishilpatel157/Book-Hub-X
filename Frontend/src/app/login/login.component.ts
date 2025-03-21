import { Component,Input } from '@angular/core';
import { UserService } from '../service/user.service';
import { SharedService } from '../service/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email : string ='';
  password :string = '';
  
  profilePictureData: ArrayBuffer | null = null;
  profilePictureBase64: string | null = null;


  @Input() isloggedIn :boolean = false;
constructor(private userService :UserService,private sharedService:SharedService,private router :Router){}

  onSubmit(){
console.log(this.password)
    this.userService.login(this.email,this.password).subscribe(res =>{
      
      if(res){
       localStorage.setItem('token',res.headers.get('Authorization'))

       alert('login Successfull')  
       // window.location.reload()
       this.userService.getUser().subscribe(res =>{
        localStorage.setItem("userName",res.body.firstName)
        
       })
       this.userService.getProfilePicture().subscribe(
         (data) => {
            this.profilePictureData = data;
            
            // Convert ArrayBuffer to Blob
            const blob = new Blob([data], { type: 'image/jpeg' }); // Adjust the 'image/jpeg' type based on your image type
            
            // Convert Blob to data URL
            const reader = new FileReader();
            reader.onloadend = () => {
              this.profilePictureBase64 = reader.result as string;
              localStorage.setItem('profileImage',this.profilePictureBase64)
            };
            reader.readAsDataURL(blob);
            window.location.reload()
          },
          (error) => {
            console.error('Error fetching profile picture:', error);
          })
          // this.sharedService.updateIsLoggedInStatus(true);
        }
        else
        {
          this.sharedService.updateIsLoggedInStatus(false);
          alert('login Unsuccessfull')
          
        }
        this.router.navigate(['home'])
    })
    
  }
}
