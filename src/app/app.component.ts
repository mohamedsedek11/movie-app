import { Component , CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { TrendingMoviesComponent } from './trending-movies/trending-movies.component';
import { TopRatedMoviesComponent } from './top-rated-movies/top-rated-movies.component';
import { TopRatedSeriesComponent } from './top-rated-series/top-rated-series.component';
import { TrendingSeriesComponent } from './trending-series/trending-series.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { MovieDetailsPageComponent } from './movie-details-page/movie-details-page.component';
import { CommonModule } from '@angular/common';
import { ThemeService } from './services/theme.service';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';
import { ScrollToTopComponent } from './scroll-to-top/scroll-to-top.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgxSpinnerModule ,ToastrModule,RouterOutlet ,CommonModule ,NavbarComponent , FooterComponent ,ScrollToTopComponent ,MovieDetailsPageComponent , LandingComponent , HomeComponent ,TrendingMoviesComponent , TopRatedMoviesComponent , TopRatedSeriesComponent , TrendingSeriesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ] 
})
export class AppComponent {
  title = 'movie-app';

  constructor(private themeService : ThemeService){}
  ngOnInit() {
    if (localStorage.getItem("Theme")) {
      this.themeService.settheme(localStorage.getItem("Theme"))
    }
  }

}
