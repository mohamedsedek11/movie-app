import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MoviesComponent } from './movies/movies.component';
import { SeriesComponent } from './series/series.component';
import { MovieDetailsPageComponent } from './movie-details-page/movie-details-page.component';


export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'Home',
    },
    {
        path: 'movies',
        component: MoviesComponent,
        title: 'Movies',
    },
    {
        path: 'series',
        component : SeriesComponent ,
        title: 'Series',
    },
    {
        path: ':media_type/:id',
        component: MovieDetailsPageComponent,
        title: 'movie'
    }
];
