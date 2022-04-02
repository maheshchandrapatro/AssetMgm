import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Assets } from 'src/app/models/assets';
import { HttpService } from 'src/app/service/http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isdispatchUser: string = 'disp';

  constructor(
    private route: Router,
    private httpService: HttpService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  login() {
    if (this.loginForm.status == 'VALID') {
      let payload = {
        username: this.loginForm.value.username,
        password: this.loginForm.value.password,
      };
      if (this.loginForm.value.username.toLowerCase() == this.isdispatchUser) {
        localStorage.setItem('isdispatchUser', this.isdispatchUser);
      }

      this.httpService
        .create('Employee/Login', JSON.stringify(payload))
        .subscribe(
          (response: any) => {
            if (response.data == 1) {
              // this.toastr.success('Log in successfully');
              this.route.navigateByUrl('admin');
            } else {
              this.toastr.warning('Invalid Credentials!');
            }
          },
          (error: any) => {
            this.toastr.error(error);
            console.log(error);
          }
        );
    } else {
      this.toastr.warning('Enter Username or Password');
    }
  }
}
