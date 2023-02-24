import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  showError:Boolean=false
  constructor(private dataService:DataService,private router:Router,){}

  ngOnInit(): void {
    console.log("home compnent")
  }
  
  isAuthenticated(){
    this.dataService.checkAuthentication().subscribe(response=>{
      this.router.navigate(['/prequiz'])
      console.log("::::home:::: ",response)
    },
    (error)=>{
     console.log(error)
     this.showError=true;
    });
  }
  reset(){
    this.showError=false
  }

}
