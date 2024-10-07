import { Component, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-scroll-to-top',
  standalone: true,
  imports: [],
  templateUrl: './scroll-to-top.component.html',
  styleUrl: './scroll-to-top.component.css'
})
export class ScrollToTopComponent {

  constructor( private el : ElementRef){}
  ngOnInit() {
    this.scrollaction();
  }
  scrollaction() {
    window.addEventListener('scroll', () => {
      const btn = this.el.nativeElement.querySelector('.btn_container');
      if (window.scrollY > 300) {
        btn.classList.add('show');
      } else {
        btn.classList.remove('show');
      }
    });
  }
  toTop() {
    window.scrollTo({ top: 0, behavior:'smooth' });
  }
}
