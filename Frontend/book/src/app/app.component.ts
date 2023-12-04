import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'book';

  
  ngOnInit(): void {
    initFlowbite();
  }


}
