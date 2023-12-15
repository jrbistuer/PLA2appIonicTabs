import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class LoginPage implements OnInit {

  credentials!: FormGroup;

  constructor(private fb: FormBuilder, 
    private authService: AuthService,
		private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.credentials = this.fb.group({
			email: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required, Validators.minLength(6)]]
		});
  }

  async register() {

		const user = await this.authService.register(this.credentials.value);

		if (user) {
			this.router.navigateByUrl('/', { replaceUrl: true });
		} else {
			console.log('Registration failed, Please try again!');
		}
	}

	async login() {

		const user = await this.authService.login(this.credentials.value);

		if (user) {
			this.router.navigateByUrl('/', { replaceUrl: true });
		} else {
			console.log('Login failed, Please try again!');
		}
	}

}
