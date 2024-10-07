import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  constructor() { }
  movieid = new BehaviorSubject(0)
  id$ = this.movieid.asObservable();
  changeId(id: any) {
    this.movieid.next(id);
    localStorage.setItem('id', id);
  }
  private Theme = new BehaviorSubject('light');
  theme$ = this.Theme.asObservable();
  changeTheme(theme: string) {
    this.Theme.next(theme);
    localStorage.setItem('Theme', theme);
  }


  settheme(theme: any) {
    if (theme == 'light') {
      localStorage.setItem('Theme', 'light');
      document.body.classList.remove('dark');
    } else {
      localStorage.setItem('Theme', 'dark');
      document.body.classList.add('dark');
    }
  }
}
