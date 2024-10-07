import { Component, ElementRef, Renderer2 } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { ThemeService } from '../services/theme.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-series',
  standalone: true,
  imports: [ CommonModule ,FormsModule , RouterLink],
  templateUrl: './series.component.html',
  styleUrl: './series.component.css'
})
export class SeriesComponent {

  initialPage = 1;
  

searchFunction() {
  if (this.searchVal) {
    this.arr = []
    this.all = false;
    this.loading = true;
    this.searchCondition = true;
    
    setTimeout(() => {
      this.loading = false;
      this.seriesObservable = this.movieService.searchSeries(this.searchVal).subscribe((series : any) => {
        this.seriesData = series.results;
        this.seriesData.map((series: any) => {
          series.vote_average = Math.round(series.vote_average * 10) / 10
        })
        this.allsearchresults = [...this.seriesData];
        
      });
      this.searchresult = true;
    }, 1000)
  } else {
    this.allMovies()
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

  
  seriesObservable!: any;
  seriesData!: any;
  allresults!: any[];
  allsearchresults!: any[];
  path: string = "https://image.tmdb.org/t/p/w500";
  backGround: string = "https://image.tmdb.org/t/p/original";
  searchCondition: any;
  searchVal: any;
  all: boolean = true;
  loading: boolean = false;
  searchresult: boolean = false;

  constructor(private movieService: MovieService  , private el : ElementRef) { }
  ngOnInit() {
    this.all = true;
    this.seriesObservable = this.movieService.getTvByPage(this.initialPage).subscribe((series : any) => {
      this.seriesData = series.results;
      this.seriesData.map((series: any) => {
        series.vote_average = Math.round(series.vote_average * 10) / 10
      })
      this.allresults = [...this.seriesData]
    });
    
    

   }
  ngOnDestroy() {
    this.seriesObservable.unsubscribe();
    
  }

  

  loadMore() {
    this.initialPage++;
    this.seriesObservable = this.movieService.getTvByPage(this.initialPage).subscribe((series : any) => {
      this.seriesData = series.results;
      this.seriesData.map((series: any) => {
        series.vote_average = Math.round(series.vote_average * 10) / 10
      })
      this.allresults = [...this.allresults ,...this.seriesData];
    })
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
