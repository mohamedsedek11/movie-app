import { CommonModule } from '@angular/common';
import { Component , CUSTOM_ELEMENTS_SCHEMA , ElementRef, ViewChild} from '@angular/core';
import Swiper from 'swiper';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { MovieService } from '../services/movie.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


Swiper.use([Navigation, Pagination, Autoplay]);

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [NavbarComponent, NgxSpinnerModule, CommonModule, RouterLink  ],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css',
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ] // Important for Angular 15+
})
export class LandingComponent {

  @ViewChild('swiperContainer') swiperContainer!: ElementRef;
  
 

  sliderMoviesObserve!: any;
  movies: any;
  activeSlide: any;
  InitialImage: any;
  path: string = "https://image.tmdb.org/t/p/w500";
  backGround: string = "https://image.tmdb.org/t/p/original";
  originalTitle!: string;
  overView!: string;

  Item!: any;
  private swiper!: Swiper;
  constructor( private el : ElementRef , private spinner : NgxSpinnerService , private movieService : MovieService  , private sanitizer: DomSanitizer , private toast : ToastrService){}

  active: boolean = false;
  videoUrl = 'https://www.youtube.com/embed/';
  safeUrl!: SafeResourceUrl;

  loading = true;
  ngOnInit() {
    this.sliderMoviesObserve = this.movieService.getMovies('popular').subscribe( (res : any) => {
      this.movies = res.results;
      this.movies.map((ele: any) => {
        ele.media_type = "movie"
      })
      
    });
    this.getdataforslider()
    
  }

  ngOnDestroy() {
    this.sliderMoviesObserve.unsubscribe();
  }

  ngAfterViewInit() {
    const Myswiper = this.el.nativeElement.querySelector('.swiper-container');
    const swiper =  {
      slidesPerView: 1,
      loop: true,
      centeredSlides: true,
      centeredSlidesBounds: true,
      modules: [Navigation, Pagination, Autoplay],
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
    }
    Object.assign(Myswiper, swiper);

  }


  popUp(key: any , type : any) {
    // window.open(`https://www.youtube.com/embed/${key}`, '_blank');
    if (type == 'movie') {
      this.movieService.getmoviedetails(key, "videos").subscribe((vid: any) => {
        this.Item = vid.results[0];
        if (vid.results.length > 0) {
          if (window.innerWidth < 863) {
            window.open(`https://www.youtube.com/embed/${this.Item.key}`, '_blank');
          } else {
            const unsafeUrl = `https://www.youtube.com/embed/${this.Item.key}`;
            this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(unsafeUrl);
            this.active = true;
          }
        } else {
          this.toast.warning('Trailer Not Available Now.');
        
        }
      }, (err) => {
        console.log(err);
      })
    } else {
      this.movieService.gettvdetails(key, "videos").subscribe((vid: any) => {
        this.Item = vid.results[0];
        if (vid.results.length > 0) {
          if (window.innerWidth < 863) {
            window.open(`https://www.youtube.com/embed/${this.Item.key}`, '_blank');
          } else {
            const unsafeUrl = `https://www.youtube.com/embed/${this.Item.key}`;
            this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(unsafeUrl);
            this.active = true;
          }
        } else {
          this.toast.warning('Trailer Not Available Now.');
        
        }
      }, (err) => {
        console.log(err);
      })
    }
  }


  closePopUp() {
    this.active = false;
  }

  all!: any[];
  getdataforslider() {
    this.movieService.getMovies("top_rated").subscribe((res: any) => {
      res.results.map((ele: any) => {
        ele.media_type = "movie"
      })
      this.all = [...res.results];
      
    })
    this.movieService.getseries("top_rated").subscribe((series: any) => { 
      series.results.map((ele: any) => {
        ele.media_type = "tv"
      })
      this.all = [...this.all, ...series.results]; 
      this.all.sort((a, b) => {
        return b.popularity - a.popularity;
      })
      
    })
    
  }
   
  }

  

