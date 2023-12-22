import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton, IonIcon, IonFabButton, IonFab } from '@ionic/angular/standalone';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { IVacanca } from 'src/app/model/vacanca';
import { CommonModule } from '@angular/common';
import { VacancesService } from 'src/app/shared/services/vacances.service';
import { addOutline, pencilOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButtons,
    IonButton, IonIcon, CommonModule, IonFab, IonFabButton],
})
export class Tab1Page implements OnInit {

    constructor(private authService: AuthService,
      private router: Router,
      private vacancesService: VacancesService) {
        addIcons({
          addOutline,
          pencilOutline
        });
    }

    vacances: IVacanca[] = [];
    vacancaSelected: IVacanca = {} as IVacanca;  

    ngOnInit(): void {
      this.vacancesService.getVacances().subscribe((vacances: IVacanca[]) => {
        this.vacances = vacances;
      })
    }

    ionViewWillEnter(): any {
    }

    logout() {
      this.authService.logout().then(() => {
        this.router.navigateByUrl('/login');
      })
    }

    logVacanca(vacanca: IVacanca) {
      console.log(vacanca);
    }
    
    addVacanca() {
      this.router.navigateByUrl('/vacanca-form');
    }

    updateVacanca(vacanca: IVacanca) {
      this.router.navigateByUrl(`/vacanca-form/${vacanca.id}`);
    }
}
