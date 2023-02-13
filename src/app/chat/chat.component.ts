import { AfterViewChecked, Component, ElementRef, ViewChild } from '@angular/core';
import { DataService} from '../service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements AfterViewChecked{

  @ViewChild('chatContainer', { static: false })
  chatContainer!: ElementRef;

  messages:any= [];
  messageIntro:any={};
  inputValue!: string;
  options:any
  time:string
 



  constructor(private dataService: DataService) {
    const date = new Date();
    const options: Intl.DateTimeFormatOptions = {
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      hour: 'numeric',
      minute: 'numeric',
    
    };
    const formatter = new Intl.DateTimeFormat('en-US', options);
    this.time = formatter.format(date);
  }
   
  ngOnInit() {

    this.introduce({name:'Welcome',message:'hi'})
 
  }
  

  ngAfterViewChecked() {
    console.log("calling bottom")
    this.scrollToBottom();
  }

  scrollToBottom() {
    this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
}

  async introduce(event:any){
 await this.dataService.sendMessage(event)
   this.dataService.introMessage.subscribe(response => {
    setTimeout(() => {
      console.log("send user::: ",response)
      if(response.length!=0){
          this.messageIntro = response[0]
         }
     this.inputValue=''
    }, 1000)
     
  });

  }
  sendUserMessage(){
    console.log(this.inputValue)
    if(this.inputValue!=''){
    this.dataService.sendUserMessage(this.inputValue);
    this.dataService.currentMessages.subscribe(response => {
      setTimeout(() => {
        console.log("send user::: ",response)
         this.messages = response
        
       this.inputValue=''
      }, 1000);
     
     }); 
    }
    else{
      window.alert("Cannot send empty message!");
    }
  }
 

}
