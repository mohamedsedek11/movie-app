import { CommonModule } from '@angular/common';
import { Component , CUSTOM_ELEMENTS_SCHEMA  , ViewChild , ElementRef, Renderer2 } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { ThemeService } from '../services/theme.service';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-top-rated-movies',
  standalone: true,
  imports: [CommonModule , RouterLink ],
  templateUrl: './top-rated-movies.component.html',
  styleUrl: './top-rated-movies.component.css',
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ] 
})
export class TopRatedMoviesComponent {
  @ViewChild('swiperContainer') swiperContainer!: ElementRef;
  constructor(private el: ElementRef, private movieService: MovieService , private themeService : ThemeService, private render : Renderer2) { }
  
  path: string = "https://image.tmdb.org/t/p/w500";
  movies!: any;
  Allmovies!: any;
  theme!: string;

  arr : boolean[] = []
  observe!: IntersectionObserver;

  active = 0;
  left = "0px";
  moviesObservable!: any;
  seriesObservable!: any;
  series: any;
  allseries: any;
  allresults! : any[]

  ngOnInit() {

    this.gettopratedmovies();

  }

  ngOnDestroy() {
    
  }

  ngAfterViewInit() {
    const Myswiper = this.el.nativeElement.querySelector('.swiper-container');
    const swiper =  {    
      loop: true,
    }
    Object.assign(Myswiper, swiper);
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
      threshold: 1
    })
this.observe.observe(box)
  }


  gettopratedmovies() {
   this.moviesObservable =  this.movieService.getTopRatedMovies().subscribe((res: any) => {
     this.Allmovies = res.results;
     this.Allmovies.map((ele: any) => {
       ele.media_type = "movie"
       ele.vote_average = Math.round(ele.vote_average * 10) / 10
    })
      this.allresults = [...this.Allmovies]
    })
  }

  gettopratedseries() {
   this.seriesObservable =  this.movieService.getTopRatedSeries().subscribe((res: any) => {
     this.allseries = res.results;
     this.allseries.map((ele: any) => {
       ele.media_type = "tv"
       ele.vote_average = Math.round(ele.vote_average * 10) / 10
    })
      this.allresults = [ ...this.allseries]
      
    })
  }


  switch(event: any) {
    this.arr = Array(this.allresults.length).fill(false);
    if (event.target.innerText == "Movies") {
      this.active = 0;
      this.left = "0px";
      
      this.gettopratedmovies()
      
    } else if (event.target.innerText == "Series") {
      this.active = 1;
      this.left = "80px";
      
      this.gettopratedseries()
      
    }
  }


}
