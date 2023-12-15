import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton, IonIcon } from '@ionic/angular/standalone';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IVacanca } from 'src/app/model/vacanca';
import { CommonModule } from '@angular/common';
import { VacancesService } from 'src/app/shared/services/vacances.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton, IonIcon, ReactiveFormsModule, CommonModule],
})
export class Tab1Page implements OnInit {
  constructor(private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private vacancesService: VacancesService) {}

    vacances: IVacanca[] = [];
    vacancaForm!: FormGroup;
    vacancaSelected: IVacanca = {} as IVacanca;  

    ngOnInit(): void {
      this.initForm();
      this.vacancesService.getVacances().subscribe((vacances: IVacanca[]) => {
        this.vacances = vacances;
      })
    }

    ionViewWillEnter() {

    }

    initForm() {
      this.vacancaForm = this.formBuilder.group({
        nom: [{value: '', disabled: false}, [Validators.required, Validators.minLength(5)]],
        preu: [{value: '', disabled: false}, [Validators.required]],
        pais: [{value: '', disabled: false}, [Validators.required]],
        descripcio: [{value: '', disabled: false}, []]
      })
    }  

    logout() {
      this.authService.logout().then(() => {
        this.router.navigateByUrl('/login');
      })
    }

    guardarVacanca() {
      const v = this.vacancaForm.value as IVacanca;
      console.log(v);
      this.vacancesService.addVCacanca(v);
    }

    logVacanca(vacanca: IVacanca) {
      console.log(vacanca);
    }

}
