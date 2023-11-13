import 'zone.js';
import { Component, inject } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { BtnToogleThemeComponent } from './btn-toogle-theme/btn-toogle-theme.component';
import { ThemeService } from './theme.service';
import { NgClass } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgClass, BtnToogleThemeComponent],
  providers: [ThemeService],
  template: `

  <div [ngClass]="containerClass">
  <h1>Hello from {{ name }}!</h1>
    <a target="_blank" href="https://angular.dev/overview">
      Learn more about Angular
    </a>
    <br>
    <br>
    <app-btn-toogle-theme/>
    <br>
    <br>
    <button class="p-button">Enviar</button>

  </div>

  `,
})
export class App {
  name = 'Angular';

  private themeService: ThemeService = inject(ThemeService);
  subscription!: Subscription;
  get containerClass() {
    return {
      'layout-theme-light': this.themeService.config.colorScheme === 'light',
      'layout-theme-dark': this.themeService.config.colorScheme === 'dark',
    };
  }

  constructor() {
    this.subscription = this.themeService.configUpdate$.subscribe(
      (data: any) => {
        console.log('respuesta service',data);
        const documentStyle = getComputedStyle(document.documentElement);
        const textColorSecondary = documentStyle.getPropertyValue(
          '--text-color-secondary'
        );
        console.log({ textColorSecondary });
      }
    );
  }
}

bootstrapApplication(App);
