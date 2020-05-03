import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GamerService } from 'src/app/services/gamer/gamer.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../../resources/bootstrap/css/bootstrap.min.css','./login.component.scss']
})
export class LoginComponent implements OnInit {
  errorMessage: string;
  private loginForm: FormGroup;

  constructor(private gamerService: GamerService ,private formBuilder: FormBuilder, private router: Router) {
    this.loginForm = formBuilder.group({
      login: ['', Validators.required],
      password: ['', Validators.required]
    });
   }

  ngOnInit() {

  }

  loginGamer() {
    this.errorMessage = "";
    if (this.loginForm.invalid) {
      this.errorMessage = "Email and / or password is incorrect";
      return;
    }
    this.gamerService.loginGamer(this.login.value, this.password.value)
      .pipe()
      .subscribe(data => {
        localStorage.setItem('currentGamer', JSON.stringify(data));
        this.router.navigate(['/home']);
      }, error => {
        if(error.status === 404) {
          this.errorMessage = "No Gamer was found with the following Email/Password";
        }
        if(error.status === 400) {
          this.errorMessage = "Email and / or password is incorrect";
        }
      });
  }

  get login() {
    return this.loginForm.get('login');
  }

  get password() {
    return this.loginForm.get('password');
  }

}
