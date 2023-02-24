import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataService} from '../service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  implements OnInit{
  form!: FormGroup;
  
  constructor(private formBuilder:FormBuilder,private dataService:DataService,private router:Router){

  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: '',
      password: ''
    });
  }
  login(): void {
    const user = this.form.getRawValue();
    console.log(user);
    this.dataService.login(user).subscribe(response=>{
      this.router.navigate([''])
      console.log("::::login:::: ",response)
    },
    (error)=>{
      console.log(error)
    });
  }

}
