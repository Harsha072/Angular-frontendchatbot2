import { Component } from '@angular/core';
import { DataService} from '../service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  messages:any= [];
  messageIntro:any={};
  inputValue!: string;
  constructor(private dataService: DataService) { }
 async ngOnInit() {
  await this.dataService.sendMessage("hi")
   this.dataService.introMessage.subscribe(response => {
    setTimeout(() => {
      console.log("send user::: ",response)
      if(response.length!=0){
          this.messageIntro = response[0]
         }
     this.inputValue=''
    }, 1000);
    // console.log(response)
    // if(response.length!=0){
    //   this.messageIntro = response[0]
    // }
   
     
  });
  }

  sendUserMessage(){
    this.dataService.sendUserMessage(this.inputValue);
    this.dataService.currentMessages.subscribe(response => {
      setTimeout(() => {
        console.log("send user::: ",response)
         this.messages = response
       this.inputValue=''
      }, 2000);
      // console.log("send user::: ",response)
      //  this.messages = response
      //  this.inputValue=''
     });
  }
 

}
