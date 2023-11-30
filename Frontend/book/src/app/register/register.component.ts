import { Component } from '@angular/core';
import { UserService } from '../service/user.service';
import { concatMap } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  title = 'formvalidation';
  userProfile = {
     firstName: '',
     lastName : '',
     email :'',
     password : '',
     authority : [{role : ''}]
    }
    profilePictureData: ArrayBuffer | null = null;
    profilePictureBase64: string | null = null;


    selectedFile!:File;

    onFileSelected(event :any){
      this.selectedFile = event.target.files[0];
 }

 role = "";
  
    confirmPassword :string =''
    
    onRoleChange(){
     
    }



  getPasswordStrength( password : string) : number{
    const lengthCriteria = password.length >= 8;
    const uppercaseCriteria = /[A-Z]/.test(password);
    const lowercaseCriteria = /[a-z]/.test(password);
    const digitCriteria = /[0-9]/.test(password);
    const specialCharCriteria = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password);
  
    // Calculate a score based on the criteria met
    let score = 0;
    if (lengthCriteria) score++;
    if (uppercaseCriteria) score++;
    if (lowercaseCriteria) score++;
    if (digitCriteria) score++;
    if (specialCharCriteria) score++;
  
    // Determine the password strength based on the score
  return score;
  
  }

   getEmailValidity(email : string) : boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email) ;
  }

  constructor(private userService:UserService,private router:Router){
    console.log(this.userProfile)
  }
  formSubmitted : boolean = false
  checkDetails : boolean =false

  onSubmit() {
    this.formSubmitted = true;
  
    if (
      this.getPasswordStrength(this.userProfile.password) > 4 &&
      this.userProfile.firstName.length > 4 &&
      this.getEmailValidity(this.userProfile.email) &&
      this.userProfile.password == this.confirmPassword
    ) {
      this.checkDetails = true;
      alert("Form submitted successfully");
  
    
    
this.userService
.registerUser(this.userProfile)
.pipe(
  concatMap((registrationResult: any) => {
    // Process registration result if needed
    console.log('Registration Result:', registrationResult);

    // Continue with the profile picture upload
    return this.userService.uploadProfilePicture(
      this.selectedFile,
      this.userProfile.email
    );
  })
)
.subscribe(
  (uploadResult) => {
    console.log('Upload Result:', uploadResult);

    // Further processing if needed

    // Call the login method after successful registration and upload
    console.log(this.userProfile.email, this.userProfile.password);
    this.userService.login(this.userProfile.email, this.userProfile.password).subscribe(
      (loginResult) => {
        if (loginResult) {
          localStorage.setItem('token', loginResult.headers.get('Authorization'));
          // Fetch profile picture after successful login
          localStorage.setItem("userName",loginResult.body.firstName)
          this.getProfilePicture();
        }
        console.log('Login Result:', loginResult);
        // console.log(loginResult.body.authority[0].role)
        localStorage.setItem("role",loginResult.body.authority[0].role)
        this.router.navigate(['home'])
        
      },
      (loginError) => {
        console.error('Login Error:', loginError);
        // Handle login errors
      }
    );
  },
  (error) => {
    console.error('Error:', error);
    // Handle errors during registration or upload
  }
  );
  
  
  
  
  // 
  // 
  // 
  // 
}



}




getProfilePicture() {
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
    }
  );
}

}


