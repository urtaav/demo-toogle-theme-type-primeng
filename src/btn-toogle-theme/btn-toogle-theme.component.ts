import { Component, inject, OnInit } from '@angular/core';
import { ThemeService } from '../theme.service';

@Component({
  selector: 'app-btn-toogle-theme',
  standalone: true,
  templateUrl: './btn-toogle-theme.component.html',
  styleUrls: ['./btn-toogle-theme.component.css'],
  providers: [ThemeService],
})
export class BtnToogleThemeComponent {
  private themeService: ThemeService = inject(ThemeService);

  changeTheme = (theme: string, colorScheme: string) => {
    console.log('changeTheme', theme);
    console.log('colorScheme', colorScheme);

    const themeLink = <HTMLLinkElement>document.getElementById('theme-css');
    // console.log(themeLink);

    const newHref = themeLink
      .getAttribute('href')!
      .replace(this.themeService.config.theme, theme);

    console.log(themeLink.getAttribute('href'));
    console.log({ newHref });

    this.replaceThemeLink(newHref, () => {
      console.log('replaceThemeLink');
      this.themeService.config.theme = theme;
      this.themeService.config.colorScheme = colorScheme;

      const documentStyle = getComputedStyle(document.documentElement);
      const textColorSecondary =
        documentStyle.getPropertyValue('--primary-color');
      console.log({ textColorSecondary });

      this.themeService.onConfigUpdate();
    });
  };

  replaceThemeLink = (href: string, onComplete: Function) => {
    const id: string = 'theme-css';
    const themeLink = <HTMLLinkElement>document.getElementById(id);
    const cloneLinkElement = <HTMLLinkElement>themeLink.cloneNode(true);
    cloneLinkElement.setAttribute('href', href);
    cloneLinkElement.setAttribute('id', id + '-clone');

    themeLink.parentNode!.insertBefore(cloneLinkElement, themeLink.nextSibling);
    cloneLinkElement.addEventListener('load', () => {
      themeLink.remove();
      cloneLinkElement.setAttribute('id', id);
      onComplete();
    });
  };
}
