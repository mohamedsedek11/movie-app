import { Component, CUSTOM_ELEMENTS_SCHEMA  , ViewChild , ElementRef, Renderer2} from '@angular/core';
import { MovieService } from '../services/movie.service';
import { ThemeService } from '../services/theme.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-trending-movies',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './trending-movies.component.html',
  styleUrl: './trending-movies.component.css',
  schemas: [ CUSTOM_ELEMENTS_SCHEMA] 
})
export class TrendingMoviesComponent {

  @ViewChild('swiperContainer') swiperContainer!: ElementRef;
  constructor(private moviesService: MovieService , private el : ElementRef , private render : Renderer2 , private themeService : ThemeService) { }
  
  path: string = "https://image.tmdb.org/t/p/w500";
  moviesObservable!: any;
  seriesObservable!: any;
  Allmovies!: any;
  theme! : string;
  arr : boolean[] = []
  observe!: IntersectionObserver;

  active = 0;
  left = "0px";

  series: any;
  allseries: any;

  allresults! : any[]

  ngOnInit() {
    this.gettrendingMoviesandseriesDay()

    

  }

  
  gettrendingMoviesandseriesDay() {
   this.moviesObservable = this.moviesService.getTrendingMovies("day").subscribe((res: any) => {
     this.Allmovies = res.results;
     this.Allmovies.map((ele: any) => {
       ele.media_type = "movie"
       ele.vote_average = Math.round(ele.vote_average * 10) / 10
    })
      this.allresults = [...this.Allmovies]
    })
   this.seriesObservable =  this.moviesService.getTrendingSeries("day").subscribe((res: any) => {
     this.allseries = res.results;
     this.allseries.map((ele: any) => {
       ele.media_type = "tv"
       ele.vote_average = Math.round(ele.vote_average * 10) / 10
    })
      this.allresults = [...this.allresults, ...this.allseries]
      this.allresults.sort((a, b) => {
        return b.popularity - a.popularity;
      })
    })
  }

  gettrendingMoviesandseriesWeek() {
  this.moviesObservable =   this.moviesService.getTrendingMovies("week").subscribe((res: any) => {
    this.Allmovies = res.results;
    this.Allmovies.map((ele: any) => {
      ele.media_type = "movie"
      ele.vote_average = Math.round(ele.vote_average * 10) / 10
    })
      this.allresults = [...this.Allmovies]
  })
    
  this.seriesObservable =   this.moviesService.getTrendingSeries("week").subscribe((res: any) => {
    this.allseries = res.results;
    this.allseries.map((ele: any) => {
      ele.media_type = "tv"
      ele.vote_average = Math.round(ele.vote_average * 10) / 10
    })
      this.allresults = [...this.allresults, ...this.allseries]
      this.allresults.sort((a, b) => {
        return new Date(b.release_date).getTime() - new Date(a.release_date).getTime();
      })
    
    })
  }


  switch(event: any) {
    this.arr = Array(this.allresults.length).fill(false);
    if (event.target.innerText == "Day") {
      this.active = 0;
      this.left = "0px";
      
      this.gettrendingMoviesandseriesDay()
      
    } else if (event.target.innerText == "Week") {
      this.active = 1;
      this.left = "64px";
      
      this.gettrendingMoviesandseriesWeek()
      
    }
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

  ngOnDestroy() {
    
  }

  ngAfterViewInit() {
    const Myswiper = this.el.nativeElement.querySelector('.swiper-container');
    const swiper =  {
      loop: true,
    }
    Object.assign(Myswiper, swiper);
  }




 
}
