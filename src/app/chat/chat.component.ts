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
  // messages: any[] = [
  //   { text: 'Hello', sender: 'chatbot' },
  //   { text: 'Hi there', sender: 'user' },
  //   { text: 'How are you?', sender: 'chatbot' },
  //   { text: 'I am fine, thanks', sender: 'user' },
  // ];



  constructor(private dataService: DataService) { }
  ngOnInit() {

    this.introduce({name:'Welcome',message:'hi'})
 
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
