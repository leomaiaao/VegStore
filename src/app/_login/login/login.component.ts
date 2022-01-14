import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm!: FormGroup;
  private user = new Observable<any>();  

  constructor(private formbuilder: FormBuilder, private http: HttpClient, private router: Router, private loginservice: LoginService) { }

  ngOnInit(): void {
    this.loginForm = this.formbuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }
  login() {
    this.http.get<any>("http://localhost:3000/signupusers")
      .subscribe({
        next: (result: any) => {
          this.user = result.find((a: any) => {
            return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password
          });
          if (this.user) {
            alert("Login Sucess");
            sessionStorage.setItem('usuário', JSON.stringify(this.user));
            this.loginForm.reset();
            this.router.navigate(['fruit']);
          } else {
            alert('User not found');
          }
        }, error: (err: any) => {
          alert("Something Went Wrong");
        }
      })
  }
}
