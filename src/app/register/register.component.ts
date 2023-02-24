import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataService} from '../service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form!: FormGroup;
  
  constructor(private formBuilder:FormBuilder,private dataService:DataService,private router:Router){

  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: '',
      email: '',
      password: ''
    });
  }

  submit(): void {
    const user = this.form.getRawValue();
    console.log(user);
    this.dataService.createUser(user).subscribe(()=>{
       this.router.navigate(['/login'])
    },
    (error)=>{
      console.log(error)
    });
  }

}
