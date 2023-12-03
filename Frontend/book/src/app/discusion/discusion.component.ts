import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommunityService } from '../service/community.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-discusion',
  templateUrl: './discusion.component.html',
  styleUrls: ['./discusion.component.css'],
})
export class DiscusionComponent implements OnInit {
  typing = '';

  message :string  = ''

  date1 :any[] = [];
  
  isTyping: boolean = false;
  typingTimeout: any;

  onTyping() {
    this.isTyping = true;

    clearTimeout(this.typingTimeout);

    this.typingTimeout = setTimeout(() => {
      this.isTyping = false;
    }, 500); // Adjust the delay (in milliseconds) as needed
  }
  formatDate(dateTime: number[]) {
    const [year, month, day, hours, minutes, seconds, milliseconds] = dateTime;
    const dateObject = new Date(year, month - 1, day, hours, minutes, seconds, milliseconds);
    return this.datePipe.transform(dateObject, 'medium');
  }


  
  community: any = {
    
    title: '',
    creator: {
    
      firstName: '',
      lastName: '',
      email: '',
    },
    createAt: new Date(), // replace with the actual date
    discussions: [],
    members: [],
    book: {
      title: '',
      description: '',
    },
  };
  constructor(
    private router: ActivatedRoute,
    private communityService: CommunityService,
    private datePipe : DatePipe
  ) {}

  ngOnInit(): void {
    this.router.params.subscribe((param) => {
      const id = Number(param['id']);


      this.communityService.getMessage(id).subscribe((res) => {
        this.community = res;
        console.log(this.community)
      });
    });
  }

  sendMessage(id : number){
    this.message

    console.log(this.message)
    this.communityService.sendMessage(id,this.message).subscribe(res=> {
      console.log(res)

      this.community = res
      this.message = ''
    })
  }

  

}
