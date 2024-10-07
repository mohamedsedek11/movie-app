import { CommonModule, DecimalPipe } from '@angular/common';
import { Component, ElementRef, Input, Renderer2 } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { FormsModule } from '@angular/forms';

import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [CommonModule , FormsModule , RouterLink , DecimalPipe],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css'
})
export class MoviesComponent {
  
  initialPage = 1;
  constructor( private movieService: MovieService, private el: ElementRef) { }
  
  /* search and filtration */
  searchCondition: boolean = false;
  searchVal!: any;

  /* search and filtration */ 


  /* movies data and category */
  allresults!: any[];
  allsearchresults!: any[];
  movies!: any;
  

  category!: any;
  genre!: any;
  movieObservable!: any;
  
  /* movies data and category */

  /* theme and poster path */
  
  path: string = "https://image.tmdb.org/t/p/w500";
  backGround: string = "https://image.tmdb.org/t/p/original";
  /* theme and poster path */

  @Input('name') name?: string;


  all: boolean = true;
  loading: boolean = false;
  searchresult: boolean = false;
  ngOnInit() {
    this.all = true;
    this.movieObservable =  this.movieService.getMoviesByPage(this.initialPage).subscribe((movies : any) => {
      this.movies = movies.results;
      this.movies.map((movie: any) => {
        movie.vote_average = Math.round(movie.vote_average * 10) / 10
      })
      
      this.allresults = [...this.movies];
    })  
    
  }

  loadMore() {
    this.initialPage++;
    this.movieObservable = this.movieService.getMoviesByPage(this.initialPage).subscribe((movies : any) => {
      this.movies = movies.results;
      this.movies.map((movie: any) => {
        movie.vote_average = Math.round(movie.vote_average * 10) / 10
        if (movie.vote_average == 0) {
          movie.vote_average = "--";
        }
      })
      this.allresults = [...this.allresults ,...this.movies];
    })
  }


  ngOnDesrtoy() {
    this.movieObservable.unsubscribe();
    
    
  }
  
 
   

 

  searchFunction() {
    if (this.searchVal) {
      this.arr = []
      this.all = false;
      this.loading = true;
      this.searchCondition = true;
      const input = this.el.nativeElement.querySelector('input');
      input.disabled = true;
      setTimeout(() => {
        this.loading = false;
        this.searchresult = true;
        this.movieObservable = this.movieService.searchMovies(this.searchVal).subscribe((movie : any) => {
          this.movies = movie.results;
          this.movies.map((movie: any) => {
            movie.vote_average = Math.round(movie.vote_average * 10) / 10
          })
        this.allsearchresults = [...this.movies]
      });
      },1000)
      
    }
  }

  allMovies() {
    this.searchCondition = false;
    this.searchVal = '';
    this.searchresult = false;
    const input = this.el.nativeElement.querySelector('input'); 
    input.disabled = false;
    this.ngOnInit();
  }
  

  

  arr : boolean[] = []
  observe!: IntersectionObserver;

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

}
