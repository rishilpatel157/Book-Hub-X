import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { SharedService } from '../service/shared.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isloggedIn: any = false;
  name!: any;
  role!: any;
  profileImage: string | null =
    'data:image/png;base64,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';
  constructor(
    private userService: UserService,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.sharedService.isloggedIn$.subscribe((value) => {
      this.isloggedIn = value;
    });

    if (this.userService.isLoggedIn()) {
      this.isloggedIn = true;
      this.profileImage = localStorage.getItem('profileImage');
      this.name = localStorage.getItem('userName');
      this.role = localStorage.getItem('role');
    }
  }

  logout() {
    this.userService.logout();
    localStorage.removeItem('profileImage');
    this.isloggedIn = false;
    this.profileImage =
      'data:image/png;base64,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';
  }
}
