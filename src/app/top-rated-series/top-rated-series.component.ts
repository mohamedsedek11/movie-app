import { CommonModule } from '@angular/common';
import { Component , CUSTOM_ELEMENTS_SCHEMA  , ViewChild , ElementRef, Renderer2 } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { ThemeService } from '../services/theme.service';


@Component({
  selector: 'app-top-rated-series',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './top-rated-series.component.html',
  styleUrl: './top-rated-series.component.css',
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class TopRatedSeriesComponent {
  @ViewChild('swiperContainer') swiperContainer!: ElementRef;
  theme!: string;
  path: string = "https://image.tmdb.org/t/p/w500";
  movies!: any;
  Allseries!: any;

  constructor(private el: ElementRef, private render : Renderer2 , private themeService : ThemeService , private movieService: MovieService) { }
  
  

  ngOnInit() {

    this.movies = this.movieService.getTopRatedSeries().subscribe((res) => {
      this.Allseries = res;
      this.Allseries = this.Allseries.results;
    })
    this.getStartedWithTheme();
  }

  ngOnDestroy() {
    this.movies.unsubscribe();
  }

  ngAfterViewInit() {
    const Myswiper = this.el.nativeElement.querySelector('.swiper-container');
    const swiper =  {
      slidesPerView: 6,
      loop: true,
      centeredSlides: true,
      centeredSlidesBounds: true,
    }
    Object.assign(Myswiper, swiper);
  }

  getStartedWithTheme() {
    
    if (!localStorage.getItem('Theme')) {
      this.themeService.theme$.subscribe(theme => {
        console.log(theme);
      })
      
    } else {
      this.themeService.changeTheme(localStorage.getItem('Theme') as string);
      this.themeService.theme$.subscribe(theme => {
        this.theme = theme;
        this.applyTheme(theme);
      })
    }
      
   
  
  }
  applyTheme(theme: string) {
    if (theme === 'dark') {
      this.el.nativeElement.querySelector('.top-rated-series-section').classList.add('dark');
    } else {
      this.el.nativeElement.querySelector('.top-rated-series-section').classList.remove('dark');
    }
  }
}
