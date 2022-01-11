import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public signupForm!: FormGroup;
  constructor( private formBuilder: FormBuilder, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      name:[''],
      email:[''],
      password:[''],
      mobileNumber:['']
    })
  }
  signUp(){
    this.http.post<any>("http://localhost:3000/signupusers", this.signupForm.value)
    .subscribe({
      next: (result: any) => {
        alert("Sign Up Sucessfull");
        this.signupForm.reset();
        this.router.navigate(['login'])

      },
      error : (err:any) =>{
        alert("Something Went Wrong");
      }
    })

  }
}
