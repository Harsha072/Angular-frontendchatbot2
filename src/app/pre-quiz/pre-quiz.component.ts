import { Component } from '@angular/core';
import { DataService } from '../service';
import { Quiz } from '../service';

@Component({
  selector: 'app-pre-quiz',
  templateUrl: './pre-quiz.component.html',
  styleUrls: ['./pre-quiz.component.css']
})
export class PreQuizComponent {

  message: string | undefined
  question!: string;
  options!: string[];
  next: number = 1
  showModal = false;
  pickOptionsModal = false
  questionLength: any
  currentQuestion: number = 0
  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.startQuiz(this.next)
    this.dataService.getQuizLength().subscribe(response => {
      console.log("ng on init ", response)
      this.questionLength = response.length
      this.currentQuestion = this.questionLength - (this.currentQuestion + 1)

      console.log("on initial", this.questionLength)
      console.log("on initial current ", this.currentQuestion)
    }, error => {
      console.log(error);
    });



  }
  async startQuiz(questionIndex: number) {
    this.dataService.startQuiz(questionIndex)
      .subscribe(response => {
        console.log("quiz question in component :::: ",);
        if (response.message === 'end') {
          console.log("if cond")
          this.showModal = true;
        }
        else {

          console.log(response)
          this.question = response.question
          this.options = response.options
        }

      }, error => {
        console.log(error);
      });

  }
  showRemaining(currentQuestion: number) {
    console.log("question length ", this.questionLength)
    console.log("current question ", currentQuestion)
    if (currentQuestion <= this.questionLength) {
      this.currentQuestion = this.questionLength
    }
    else {
      console.log("in show remaining current  ", this.currentQuestion)
      console.log("in show remaining quiz length ", this.questionLength)
      this.currentQuestion = this.questionLength
    }
  }
  handleNextQuestion() {
    console.log("hadimng next question::::: ")
    this.next++
    this.currentQuestion++;
    this.showRemaining(this.currentQuestion)
    this.startQuiz(this.next)
  }

}
