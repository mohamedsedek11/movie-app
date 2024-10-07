import { Component } from '@angular/core';
import { LandingComponent } from '../landing/landing.component';
import { TopRatedMoviesComponent } from '../top-rated-movies/top-rated-movies.component';
import { TopRatedSeriesComponent } from '../top-rated-series/top-rated-series.component';
import { TrendingMoviesComponent } from '../trending-movies/trending-movies.component';
import { TrendingSeriesComponent } from '../trending-series/trending-series.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [LandingComponent , TopRatedMoviesComponent , TopRatedSeriesComponent , TrendingMoviesComponent , TrendingSeriesComponent ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
