import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public signupForm!: FormGroup;
  private user = new Observable<any>();  
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      mobileNumber: ['', Validators.required]
    })
  }
  signUp() {
    this.http.get<any>("http://localhost:3000/signupusers")
    .subscribe({
      next: (result: any) => {
        this.user = result.find((a: any) => {
          return a.email === this.signupForm.value.email
        });
        if (this.user) {
          alert("This email is alredy in use");
        } else {
          this.http.post<any>("http://localhost:3000/signupusers", this.signupForm.value)
            .subscribe({
              next: (result: any) => {
                alert("Sign Up Sucessfull");
                this.signupForm.reset();
                this.router.navigate(['login'])
    
              }
            })
    
        }
      }, error: (err: any) => {
        alert("Something Went Wrong");
      }
    })
  }
}
