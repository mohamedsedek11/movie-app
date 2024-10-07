import { Component ,CUSTOM_ELEMENTS_SCHEMA, ElementRef, Input } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { CommonModule, DecimalPipe } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { ThemeService } from '../services/theme.service';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-movie-details-page',
  standalone: true,
  imports: [CommonModule, DecimalPipe],
  templateUrl: './movie-details-page.component.html',
  styleUrl: './movie-details-page.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA] 
})
export class MovieDetailsPageComponent {

  



  /* Hero logic */
  movieDataObservable: any;
  movieCreditsObservable: any;
  tvDataObservable: any;
  tvCreditsObservable: any;
  tv: any;
  movie: any;
  movieCastObservable: any;
  cast: any;

  overview: any;
  title: any;
  poster!: string;
  bachdrop: any;
  crew: any;
  genres: any;
  voteAverage: any;
  status: any;
  releasedDate: any;
  directorName: any;
  writerName: any;
  runTime: any;
  productionName: any;
/* Hero logic */

/* Main Properties */
  vidoesObservable: any;
  videos: any;
  videosCountLessThan4: any;
  videosEmpty: any;
  active: boolean = false;
  videoUrl = 'https://www.youtube.com/embed/';
  safeUrl!: SafeResourceUrl;
  /* Main Properties */

  videoLength! : number;


  id: any;
  mediaType!: string;

  arr : boolean[] = []
  showMore: boolean = false;
  
  observe!: IntersectionObserver;

  similarMoviesObservable: any;
  moviesSimilar: any;
  path: string = "https://image.tmdb.org/t/p/w500";
  similarSeriesObservable: any;
  seriesSimilar: any;

  constructor(private movieService: MovieService , private route : ActivatedRoute , private router : Router , private themeService : ThemeService , private el : ElementRef , private sanitizer: DomSanitizer) { }
  
 
  ngOnInit() {
    
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.mediaType = params['media_type'];
      
     this.castinit()
     this.header()
     this.similar()
     this.trailers()
    });
  }

  loaded(index: number, box: any, img: any) {
    let intervalId: any = null;
    this.observe = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { 
        if (entry.isIntersecting && !intervalId) {
          intervalId = setInterval(() => {
            this.arr[index] = true;
          }, 500);
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




  castinit() {
    if (this.mediaType == 'movie') {
      this.movieCastObservable = this.movieService.getmoviedetails(this.id, 'credits').subscribe(data => {
        this.cast = data;
        this.cast = this.cast.cast;
      })
    } else {
      this.movieCastObservable = this.movieService.gettvdetails(this.id, 'credits').subscribe(data => {
        this.cast = data;
        this.cast = this.cast.cast;
      })
    }
    
  }


  header() {
    if (this.mediaType == 'movie') {
      this.movieDataObservable = this.movieService.getMovieDetails(this.id).subscribe(res => {
        this.movie = res;
        this.title = this.movie.original_title;
        this.status = this.movie.status;
        this.releasedDate = this.movie.release_date;
        this.overview = this.movie.overview.substring(0, 200);
        this.bachdrop = this.movie.backdrop_path;
        this.poster = 'https://image.tmdb.org/t/p/original' + this.movie.poster_path;
        this.genres = this.movie.genres;
        this.runTime = this.formatRuntime(this.movie.runtime);
        this.voteAverage = this.movie.vote_average;
        this.voteAverage = Math.round(this.voteAverage * 10) / 10;
        if (this.voteAverage == 0) {
          this.voteAverage = "--";
        }
        
      })
      this.movieCreditsObservable = this.movieService.getmoviedetails(this.id, 'credits').subscribe((res: any) => {
        this.crew = res.crew;
        this.directorName = this.crew.filter((person: { known_for_department: any; }) => person.known_for_department === 'Directing')
        if (this.directorName.length == 0) {
          this.directorName = "Not available";
        } else {
          this.directorName = this.directorName[0].name;
        }
     
        this.writerName = this.crew.filter((person: { known_for_department: any; }) => person.known_for_department === 'Writing')
        if (this.writerName.length == 0) {
          this.writerName = "Not available";
        } else {
          this.writerName = this.writerName[0].name;
        }
        this.productionName = this.crew.filter((person: { known_for_department: any; }) => person.known_for_department === 'Production')
        if (this.productionName.length == 0) {
          this.productionName = "Not available";
        } else {
          this.productionName = this.productionName[0].name;
        }
      }, (err: any) => {
        console.log("Error of get movie details", err)
      });
    } else {
      this.tvDataObservable = this.movieService.getSeriesDetails(this.id).subscribe(res => {
        this.tv = res;
        this.title = this.tv.name;
        this.status = this.tv.status;
        this.releasedDate = this.tv.first_air_date;
        this.overview = this.tv.overview.substring(0, 200);
        this.bachdrop = this.tv.backdrop_path;
        this.poster = 'https://image.tmdb.org/t/p/original' + this.tv.poster_path;
        this.genres = this.tv.genres;
        this.runTime = this.tv.number_of_episodes;
        this.voteAverage = this.tv.vote_average;
        this.voteAverage = Math.round(this.voteAverage * 10) / 10;
        if (this.voteAverage == 0) {
          this.voteAverage = "--";
        }
      })
      this.tvCreditsObservable = this.movieService.gettvdetails(this.id, 'credits').subscribe((res : any) => {
        this.crew = res.crew;
        this.directorName = this.crew.filter((person: { known_for_department: any; }) => person.known_for_department === 'Directing')
        if (this.directorName.length == 0) {
          this.directorName = "Not available";
        } else {
          this.directorName = this.directorName[0].name;
        }
        this.writerName = this.crew.filter((person: { known_for_department: any; }) => person.known_for_department === 'Writing')
        if (this.writerName.length == 0) {
          this.writerName = "Not available";
        } else {
          this.writerName = this.writerName[0].name;
        }
        this.productionName = this.crew.filter((person: { known_for_department: any; }) => person.known_for_department === 'Production')
        if (this.productionName.length == 0) {
          this.productionName = "Not available";
        } else {
          this.productionName = this.productionName[0].name;
        }
      })
    }
    
  }

  formatRuntime(runtime: number): string {
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;
  
    return `${hours}h ${minutes}m`;
  }

  showmore() {
    this.showMore = !this.showMore;
    if (this.mediaType == 'tv') {
      if (this.showMore) {
        this.overview = this.tv.overview;
      } else {
        this.overview = this.tv.overview.substring(0, 200);
      }
    } else {
      if (this.showMore) {
        this.overview = this.movie.overview;
      } else {
        this.overview = this.movie.overview.substring(0, 200);
      }
    }
  }

  ngAfterViewInit() {
    const Myswiper = this.el.nativeElement.querySelector('.swiper-container');
    const swiper =  {
      
      loop: true,
    }
    Object.assign(Myswiper, swiper);

    const SwiperTrailer = this.el.nativeElement.querySelector('.swiperContainerTrailers');
    if (SwiperTrailer) {
      const swiperTrailers = {
        loop: true,
      }
      Object.assign(SwiperTrailer, swiperTrailers);
    }
    }


  ngOnDestroy() {
    if (this.mediaType == 'movie') {
      this.similarMoviesObservable.unsubscribe();
      this.movieCreditsObservable.unsubscribe();
      this.movieDataObservable.unsubscribe();
    } else {
      this.tvCreditsObservable.unsubscribe();
      this.tvDataObservable.unsubscribe();
      this.similarSeriesObservable.unsubscribe();
    }
    this.mediaType = '';
  }

  
  


  popUp(key: any) {
    // window.open(`https://www.youtube.com/embed/${key}`, '_blank');
    
    if (window.innerWidth < 863) {
      window.open(`https://www.youtube.com/embed/${key}`, '_blank');
    } else {
      const unsafeUrl = `https://www.youtube.com/embed/${key}`;
      this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(unsafeUrl);
      this.active = true;
    }
  }


  closePopUp() {
    this.active = false;
  }

  similar() {
    if (this.mediaType == 'movie') {
      this.similarMoviesObservable = this.movieService.getmoviedetails(this.id, 'similar').subscribe(data => {
        this.moviesSimilar = data;
        this.moviesSimilar = this.moviesSimilar.results;
      })
    } else {
      this.similarSeriesObservable = this.movieService.gettvdetails(this.id, 'similar').subscribe(data => {
        this.moviesSimilar = data;
        this.moviesSimilar = this.moviesSimilar.results;
        console.log(this.moviesSimilar)
      })
    }
  }

  trailers() {
    if (this.mediaType == 'movie') {
      this.vidoesObservable = this.movieService.getmoviedetails(this.id, 'videos').subscribe((videos :any) => {
        this.videos = videos.results;
        
        if (this.videos.length > 4) {
          
          this.videoLength = 0
        } else if (this.videos.length < 4 && this.videos.length > 0) {
          
          this.videoLength = 1;
        } else if (this.videos.length == 0) {
          
          this.videoLength = -1;
        }
       
      })
    } else {
      this.vidoesObservable = this.movieService.gettvdetails(this.id, 'videos').subscribe((videos :any) => {
        this.videos = videos.results;
        if (this.videos.length > 4) {
          
          this.videoLength = 0
        } else if (this.videos.length < 4 && this.videos.length > 0) {
          
          this.videoLength = 1;
        } else if (this.videos.length == 0) {
          
          this.videoLength = -1;
        }
       
      })
    }
  }
  getSimilarMovieId(id: any) {

    
    if (this.mediaType == 'movie') {
      this.router.navigate(['/movie', id]);
    } else {
      this.router.navigate(['/tv', id]);
    }
    window.scrollTo({ top: 0, behavior:'smooth' });
    this.castinit()
    this.header()
    this.similar()
    this.trailers()
  }

  
}
