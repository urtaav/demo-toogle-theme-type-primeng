import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class ThemeService {
  config: any = {
    colorScheme: 'light',
    theme: 'tailwind-light',
  };

  private configUpdate = new Subject<any>();
  configUpdate$ = this.configUpdate.asObservable();

  onConfigUpdate() {
    console.log('onConfigUpdate');
    this.configUpdate.next(this.config);
  }
}
