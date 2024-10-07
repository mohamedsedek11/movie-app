import { CommonModule } from '@angular/common';
import { Component, ElementRef, Renderer2 } from '@angular/core';
import { ThemeService } from '../services/theme.service';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule , RouterLink , RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(private el : ElementRef , private render : Renderer2 , private themeService : ThemeService) {
  }

  isOpen: boolean = false;
  theme: string = 'light';
  
  activeLight = 0;

  ngOnInit() {
    if (localStorage.getItem('Theme')) {
      this.theme = localStorage.getItem('Theme') as string;
      this.activeLight = this.theme === 'light'? 0 : 1;
    }
    
    // const list = this.render.selectRootElement('#list', true)
    // const lightBtn = this.render.selectRootElement('#lightBtn', true)
    // const DarkBtn = this.render.selectRootElement('#DarkBtn', true)
    // const SideBar = this.render.selectRootElement('.nav_links_sidebar', true)
    // const SideBarBtnLight = this.render.selectRootElement('#sideBtnLight', true)
    // const SideBarBtnDark = this.render.selectRootElement('#sideBtnDark' , true)
    // if (this.theme === 'light') {
    //   lightBtn.classList.add('Work');
    //   DarkBtn.classList.remove('Work');
    //   SideBar.classList.remove('dark');
    //   SideBarBtnLight.classList.add('active');
    // } else if (this.theme === 'dark') { 
    //   DarkBtn.classList.add('Work');
    //   lightBtn.classList.remove('Work');
    //   list.classList.add("dark")
    //   SideBar.classList.add('dark');
    //   SideBarBtnDark.classList.add('active');
      
    // }
    
    
    /* Overlay Logic */
    const overlay = this.el.nativeElement.querySelector('.overlay ');
    overlay.addEventListener('click', () => {
      this.el.nativeElement.querySelector('.nav_links_sidebar ').classList.toggle('open');
      overlay.classList.toggle('open');
      if (this.isOpen) {
        this.isOpen = false;
      } else {
        this.isOpen = true;
      }
    });


    /* Nav Bar scrolling Logic */
    const nav = this.render.selectRootElement('nav', true);
    window.addEventListener('scroll', () => {
      if (window.scrollY > 200) {
        nav.classList.add('scroll700')
        if (localStorage.getItem('Theme')) {
          if (localStorage.getItem('Theme') == 'dark') {
            nav.classList.add('dark')
          } else { 
            nav.classList.remove('dark')
          }
        }
      } else {
        nav.classList.remove('scroll700', 'dark');
        
      }
    });
    /* Nav Bar scrolling Logic */
    
    /* Logic Of Drop Down  */
    const target = this.render.selectRootElement('.target', true);
    const targetList = this.render.selectRootElement('.listStyleOption ul', true);
    target.addEventListener('click', () => {
      targetList.classList.toggle('block');
    })
    /* Logic Of Drop Down  */

  }



  /* Logic Of SideBar */
  Openlist() {
    this.el.nativeElement.querySelector('.overlay ').classList.toggle('open');
    this.el.nativeElement.querySelector('.nav_links_sidebar ').classList.toggle('open');


    if (this.isOpen) {
      this.isOpen = false;
    } else {
      this.isOpen = true;
    }
  }
  
  /* Logic Of SideBar */



  /* Logic Of Theme Dark Or Light */
  themeLight() { 
    this.themeService.settheme("light");
    // this.theme = 'light'
    // localStorage.setItem('Theme', this.theme);
    // const lightBtn = this.render.selectRootElement('#lightBtn', true)
    // const DarkBtn = this.render.selectRootElement('#DarkBtn', true)
    // const list = this.render.selectRootElement('#list', true)
    // const targetList = this.render.selectRootElement('.listStyleOption ul', true);
    const nav = this.render.selectRootElement('nav', true);
    // const SideBar = this.render.selectRootElement('.nav_links_sidebar', true)
    // const SideBarBtnLight = this.render.selectRootElement('#sideBtnLight', true)
    // const SideBarBtnDark = this.render.selectRootElement('#sideBtnDark' , true)
    // SideBar.classList.remove('dark')
    nav.classList.remove('dark');
    // targetList.classList.remove('block');
    // DarkBtn.classList.remove('Work' , 'dark');
    // list.classList.remove("dark")
    // lightBtn.classList.add('Work');
    // lightBtn.classList.remove('dark');
    // SideBarBtnLight.classList.add('active');
    // SideBarBtnDark.classList.remove('active');
    // this.themeService.changeTheme('light')
     this.activeLight = 0;
    
    
  }
  themeDark() {
    this.themeService.settheme("dark");
    // this.theme = 'dark';
    // localStorage.setItem('Theme' , this.theme);
    // const lightBtn = this.render.selectRootElement('#lightBtn', true)
    // const DarkBtn = this.render.selectRootElement('#DarkBtn', true)
    // const list = this.render.selectRootElement('#list', true)
    // const targetList = this.render.selectRootElement('.listStyleOption ul', true);
    const nav = this.render.selectRootElement('nav', true);
    // const SideBar = this.render.selectRootElement('.nav_links_sidebar', true)
    // const SideBarBtnLight = this.render.selectRootElement('#sideBtnLight', true)
    // const SideBarBtnDark = this.render.selectRootElement('#sideBtnDark' , true)
    // SideBar.classList.add('dark')
    nav.classList.add('dark');
    // targetList.classList.remove('block');
    // DarkBtn.classList.add('Work');
    // DarkBtn.classList.add('dark');
    // list.classList.add("dark")
    // lightBtn.classList.remove('Work');
    // lightBtn.classList.add('dark');
    // SideBarBtnLight.classList.remove('active');
    // SideBarBtnDark.classList.add('active');
    // this.themeService.changeTheme('dark')
    this.activeLight = 1;
   
  }

  /* Logic Of Theme Dark Or Light */
}
