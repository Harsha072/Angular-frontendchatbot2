import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { Emitters } from '../emitters/emitters';
import { DataService } from '../service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  authenticated = false;

  constructor(private dataService:DataService,private router:Router){

  }
  ngOnInit(): void {
    // Emitters.authEmitter.subscribe(
    //   (auth: boolean) => {
    //     console.log("auth value:::: ",auth)
    //     this.authenticated = auth;
    //   }
    // );
  }

  logout(): void {
    this.dataService.logout().subscribe(response=>{
      this.router.navigate(['/home'])
      console.log("::::login:::: ",response)
    },
    (error)=>{
      console.log(error)
    });
  }

}
