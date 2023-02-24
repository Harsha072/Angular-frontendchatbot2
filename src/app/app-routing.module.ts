import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ChatComponent } from './chat/chat.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

import { PreQuizComponent } from './pre-quiz/pre-quiz.component'; 
import { RegisterComponent } from './register/register.component';


const routes: Routes = [
  
  { path: 'chat', component: ChatComponent },
  { path: 'prequiz', component: PreQuizComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component:RegisterComponent },
  { path: '', component: HomeComponent, pathMatch: 'full' },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }