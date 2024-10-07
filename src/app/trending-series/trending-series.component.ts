import { Component , CUSTOM_ELEMENTS_SCHEMA  , ViewChild , ElementRef, Renderer2 } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { ThemeService } from '../services/theme.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-trending-series',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './trending-series.component.html',
  styleUrl: './trending-series.component.css',
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ] 
})
export class TrendingSeriesComponent {

  arr : boolean[] = []
  observe!: IntersectionObserver;
  active = 0;
  left = "0px";

  
  theme!: string;
  path: string = "https://image.tmdb.org/t/p/w500";
  series!: any;
  Allseries!: any;
  allmovies!: any;
  allresults!: any;
  movObservable!: any;
  tvObservable!: any;
  constructor(private el: ElementRef, private render : Renderer2 , private movieService: MovieService , private themeService : ThemeService) { }
  
  ngOnInit() {

    this.getpopularMovies();
    
    
  }
  getpopularMovies() {
    this.movObservable = this.movieService.getPopularMovies().subscribe((res: any) => {
      this.allmovies = res.results;
      this.allmovies.map((ele: any) => {
        ele.media_type = "movie"
        ele.vote_average = Math.round(ele.vote_average * 10) / 10
      })
      this.allmovies.sort((a : any, b : any) => {
        return new Date(b.release_date).getTime() - new Date(a.release_date).getTime();
      })
      this.allresults = [...this.allmovies]
    })
  }

  getpopularseries() {
    this.tvObservable = this.movieService.getPopularSeries().subscribe((res: any) => {
      this.Allseries = res.results;
      this.Allseries.map((ele: any) => {
        ele.media_type = "tv"
        ele.vote_average = Math.round(ele.vote_average * 10) / 10
      })
      this.allresults = [...this.Allseries]
    })
  }


  switch(event: any) {
    this.arr = Array(this.allresults.length).fill(false);
    if (event.target.innerText == "Movies") {
      this.active = 0;
      this.left = "0px";
      
      this.getpopularMovies()
      
    } else if (event.target.innerText == "Series") {
      this.active = 1;
      this.left = "80px";
      
      this.getpopularseries()
      
    }
  }

  ngOnDestroy() {
    
  }

  loaded(index: number, box: any, img: any) {
    let intervalId: any = null;
    this.observe = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { 
        if (entry.isIntersecting && !intervalId) {
          intervalId = setInterval(() => {
            this.arr[index] = true;
          }, 1000);
        } else if (!entry.isIntersecting && intervalId) {
          clearInterval(intervalId);
          intervalId = null;
        }
      })
      
    }, {
      threshold: 0.5
    })
this.observe.observe(box)
  }

  ngAfterViewInit() {
    const Myswiper = this.el.nativeElement.querySelector('.swiper-container');
    const swiper =  {
      loop: true,
    }
    Object.assign(Myswiper, swiper);
  }

  
}
