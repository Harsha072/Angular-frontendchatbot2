import { Component, Inject } from '@angular/core';
import { DataService } from '../service';
import { Quiz } from '../service';
import { HostListener } from '@angular/core';
import { OKTA_AUTH } from '@okta/okta-angular';
import OktaAuth from '@okta/okta-auth-js';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pre-quiz',
  templateUrl: './pre-quiz.component.html',
  styleUrls: ['./pre-quiz.component.css']
})
export class PreQuizComponent {

  message: string | undefined
  question!: string;
  options!: string[];
  option:any
  next: number = 1
  showModal = false;
  answere:any;
  pickOptionsModal = false
  questionLength: any
  currentQuestion: number = 1
  selectedOption: string | undefined;
  countdown: any;
  countdownInterval: any;
  selectedOptionClass: any;
  selectedOptionIndex: any;
  answeredCorrectly:number=0;
  answeredWrongly:number=0;
  unanswered:number=0;
  startTime:any;
  endTime:any;
  points:number=0;
  timeTakenArray: any[] = [];
  totalTimeTaken:any
  resultTime:any
  isTakingQuiz = true;
  remainingQuestions:any;

  constructor(private dataService: DataService, @Inject(OKTA_AUTH) private _oktaAuth: OktaAuth,private router: Router) { 
 
  }
  

 ngOnInit() {
  // this.next = Math.floor(Math.random() * 4) + 1;

  console.log("next question ::::",this.next)
   this.startQuiz(this.next)
    console.log("prequiz:::::")
    this.dataService.getQuizLength().subscribe(response => {
      console.log("ng on init ", response)
      this.questionLength = response.length
     

      console.log("on initial", this.questionLength)
      console.log("on initial current ", this.currentQuestion)
    }, error => {
      console.log(error);
    });
  // window.addEventListener('focus', () => {
  //      console.log("reloading")
  //      this.next = Math.floor(Math.random() * 4) + 1;
  //      location.reload();
  //    }); 
    

  }

 
  navigateToAbout() {
    this.router.navigate(['/chat']);
  }


  async startQuiz(questionIndex: number) {
 
    this.resetTimer();
    this.dataService.startQuiz(questionIndex)
      .subscribe(response => {
        console.log("quiz question in component :::: ",response);
        if (response.message === 'end') {
          console.log("if cond")
         this.showResult()
        }
        else {
          this.selectedOptionClass=''
          console.log(response)
          this.answere= response.answer.S
          this.question =  response.question.S
          this.options = response.options.L.map((option: { S: any; }) => option.S);
          
        }

      }, error => {
        console.log("the error",error);
      });

  }
  startTimer(seconds: number) {
    this. startTime = new Date();
    this.countdown = seconds;
    this.countdownInterval = setInterval(() => {
      if (this.countdown > 0) {
        this.countdown--;
      } else {
        this.submitAnswer();
      }
    }, 1000);
  }
  resetTimer() {
    clearInterval(this.countdownInterval);
    this.startTimer(60);
  }
  onOptionSelected(index: number) {
    this.selectedOptionIndex = index;
    console.log(this.selectedOptionIndex)
    this.selectedOption = this.options[index];
    console.log('Selected option:', this.selectedOption);
    this.endTime=new Date()
    if (this.selectedOption === this.answere) {
      this.answeredCorrectly++;
      this.selectedOptionClass = 'correct';
      this.points=this.points+10;
      
    } else {
      this.selectedOptionClass = 'wrong';
     this.answeredWrongly++;
      
    }
    const timeTaken = (this.endTime.getTime() - this.startTime.getTime()) / 1000
    console.log("time taken for each question ",timeTaken)
    this.timeTakenArray.push(timeTaken)
    this.handleNextQuestion()
  }

  submitAnswer() {
    clearInterval(this.countdownInterval);
    // Handle submitting the answer and moving to the next question
    console.log("submitting the answere automatically::::: ")
    this.unanswered++;
  this.handleNextQuestion()
  }

  showRemaining(currentQuestion: number) {
    console.log("calling show remaining:::: ")
    console.log("question length ", this.questionLength)
    console.log("current question ", currentQuestion)
  
    
    this. remainingQuestions = `${currentQuestion - 1}/${this.questionLength}`;
 
  }
  handleNextQuestion() {
    console.log("hadimng next question::::: ")
  
    // this.next = Math.floor(Math.random() * 4) + 1;
    this.next++
    console.log("next question number ",this.next)
    if(this.currentQuestion===this.questionLength){
      this.currentQuestion=this.questionLength
    }
    else{
      this.currentQuestion++;
    }
   
    
    this.showRemaining(this.currentQuestion)
    this.startQuiz(this.next)
  }
 async showResult(){
  this.showModal = true;
  this. totalTimeTaken = this.timeTakenArray.reduce((total, time) => total + time, 0);
  const averageTimeTaken = this.totalTimeTaken / this.timeTakenArray.length;
  console.log("total ", typeof this.totalTimeTaken)
 
  if (this.totalTimeTaken==0) {
    console.log("nan")
    this.resultTime = "Not available";
  } else  if (this.totalTimeTaken >= 60) {
    const minutes = Math.floor(this.totalTimeTaken / 60);
    const seconds = this.totalTimeTaken % 60;
    this.resultTime = `${minutes} minute(s) ${seconds} second(s)`;
  } else {
   this.totalTimeTaken= (this.totalTimeTaken / this.timeTakenArray.length).toFixed(1);
    this.resultTime = `${this.totalTimeTaken} second(s)`;
  }
  const time = new Date().getTime();
  const date = new Date(time);
  const timeStamp = date.toLocaleString('en-US');
    this._oktaAuth.getUser().then((user)=>{
      const score={
        email:user.email,
        score:this.points,
        totalTimeTaken:this.totalTimeTaken,
        timeStamp:timeStamp
      }
      this.dataService.prequizScore(score).subscribe((res) => {
        clearInterval(this.countdownInterval);
     },
     (error) => {
       console.log(error);
       
     })
   })
  
 
   
  }

}
