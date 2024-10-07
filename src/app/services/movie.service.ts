import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { merge } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  apiKey = '1f79e0878a80a22e074d66ef7ac6aeb0';
  url : string = 'https://api.themoviedb.org/'

  constructor(private http: HttpClient) { }
  
  /* i want get movies by page */
  getMoviesByPage(page: number) {
    return this.http.get(`https://api.themoviedb.org/3/movie/popular?api_key=${this.apiKey}&page=${page}`);
  } 
  
  
  getTvByPage(page: number) {
    return this.http.get(`https://api.themoviedb.org/3/tv/popular?api_key=${this.apiKey}&page=${page}`);
  }

 

  getMovies(type : any) {
    return this.http.get(`https://api.themoviedb.org/3/movie/${type}?api_key=${this.apiKey}`);
  }
  getseries(type: any) {
    return this.http.get(`https://api.themoviedb.org/3/tv/${type}?api_key=${this.apiKey}`);
  }
  
  getDilm4Movies() {
    return this.http.get(`https://api.themoviedb.org/3/movie/4?api_key=${this.apiKey}`);
  }

  getTopRatedMovies() {
    return this.http.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${this.apiKey}`);
  }

  getTopRatedSeries() {
    return this.http.get(`https://api.themoviedb.org/3/tv/top_rated?api_key=${this.apiKey}`);
  }

  getTrendingSeries(date : any) {
    return this.http.get(`https://api.themoviedb.org/3/trending/tv/${date}?api_key=${this.apiKey}`);
  }
  /* coming soon */
  getComingSoonMovies() {
    return this.http.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${this.apiKey}`);
  }

  getMovieDetails(id: number) {
    return this.http.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${this.apiKey}`);
  }
  getSeriesDetails(id: number) {
    return this.http.get(`https://api.themoviedb.org/3/tv/${id}?api_key=${this.apiKey}`);
  }


  searchMovies(query: string) {
    return this.http.get(`https://api.themoviedb.org/3/search/movie?api_key=1f79e0878a80a22e074d66ef7ac6aeb0&query=${query}`);
  }
  searchSeries(query: string) {
    return this.http.get(`https://api.themoviedb.org/3/search/tv?api_key=1f79e0878a80a22e074d66ef7ac6aeb0&query=${query}`);
  }
  getSimilarMovies(id: number) {
    return this.http.get(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=${this.apiKey}`);
  }
  getSimilarSeries(id: number) {
    return this.http.get(`https://api.themoviedb.org/3/tv/${id}/similar?api_key=${this.apiKey}`);
  }

  /* get trending movies */
  getTrendingMovies(date : any) {
    return this.http.get(`https://api.themoviedb.org/3/trending/movie/${date}?api_key=1f79e0878a80a22e074d66ef7ac6aeb0`);
  }

  

  /* get trending movies and tv in day */
  getTrendingMoviesAndSeries(date : any) {
    return merge(this.http.get(`https://api.themoviedb.org/3/trending/movie/${date}?api_key=1f79e0878a80a22e074d66ef7ac6aeb0`), this.http.get(`https://api.themoviedb.org/3/trending/tv/${date}?api_key=1f79e0878a80a22e074d66ef7ac6aeb0`))
  }
  

 
  
  /* i want to get all category */
  getAllCategories() {
    return this.http.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${this.apiKey}`);
  }
 
  /* i want a url pass to it the name of category return to me all movies for this category */
  getMoviesByCategory(categoryId: number) {
    return this.http.get(`https://api.themoviedb.org/3/discover/movie?api_key=1f79e0878a80a22e074d66ef7ac6aeb0&with_genres=${categoryId}`);
  }
  /* get all genre */
  getAllGenres() {
    return this.http.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=1f79e0878a80a22e074d66ef7ac6aeb0`);
  }
  
  /* i want pass the language and return movies that suitable this language */
  getMoviesByLanguage(language: string) {
    return this.http.get(`https://api.themoviedb.org/3/discover/movie?api_key=1f79e0878a80a22e074d66ef7ac6aeb0&language=${language}`);
  }
  /* i want a url pass to it the name of genre return to me all movies for this genre */
  getMoviesByGenre(genreId: number) {
    return this.http.get(`https://api.themoviedb.org/3/discover/movie?api_key=1f79e0878a80a22e074d66ef7ac6aeb0&with_genres=${genreId}`);
  }

  /* i want to pass a year and get movies in this year */
  getMoviesByYear(year: number) {
    return this.http.get(`https://api.themoviedb.org/3/discover/movie?api_key=1f79e0878a80a22e074d66ef7ac6aeb0&year=${year}`);
  }

  /* i want all movies from a date */
  getMoviesByDate(date: string) {
    return this.http.get(`https://api.themoviedb.org/3/discover/movie?api_key=1f79e0878a80a22e074d66ef7ac6aeb0&primary_release_date.gte=${date}`);
  }


  /* i want all category for tv series */
  getAllCategoriesForSeries() {
    return this.http.get(`https://api.themoviedb.org/3/genre/tv/list?api_key=1f79e0878a80a22e074d66ef7ac6aeb0`);
  }

  /* i want what popular streaming today */
  getPopularStreamingToday() {
    return this.http.get(`https://api.themoviedb.org/3/discover/tv?api_key=1f79e0878a80a22e074d66ef7ac6aeb0&language=en-US&sort_by=popularity.desc&page=1`);
  }
  
  /* i want what popular streaming in the last week */
  getPopularStreamingLastWeek() { 
    const lastWeekDate = new Date();
    lastWeekDate.setDate(lastWeekDate.getDate() - 7);
    const lastWeekStart = lastWeekDate.toISOString().slice(0, 10);
    return this.http.get(`https://api.themoviedb.org/3/discover/tv?api_key=1f79e0878a80a22e074d66ef7ac6aeb0&language=en-US&sort_by=popularity.desc&first_air_date.gte=${lastWeekStart}`);
  }
  
  getFreeToWatchMovies() {
    return this.http.get(`https://api.themoviedb.org/3/discover/movie?api_key=1f79e0878a80a22e074d66ef7ac6aeb0&with_watch_status=free`);
  }

  /* i want get all movies in different genre to gether */
  getMoviesInDifferentGenres() {
    return this.http.get(`https://api.themoviedb.org/3/discover/movie?api_key=1f79e0878a80a22e074d66ef7ac6aeb0&with_genres=18,10751`);
  }

  /* get series by category */
  getSeriesByCategory(categoryId: number) {
    return this.http.get(`https://api.themoviedb.org/3/discover/tv?api_key=1f79e0878a80a22e074d66ef7ac6aeb0&with_genres=${categoryId}`);
  }



  /* get Popular  movies */
  getPopularMovies() {
    return this.http.get(`https://api.themoviedb.org/3/movie/popular?api_key=1f79e0878a80a22e074d66ef7ac6aeb0`);
  }
  
  /* get coming soon seris */
  getComingSoonSeries() {
    return this.http.get(`https://api.themoviedb.org/3/discover/tv?api_key=1f79e0878a80a22e074d66ef7ac6aeb0&primary_release_date.gte=${new Date().toISOString().slice(0, 10)}&sort_by=popularity.desc`);
  }
  /* get popular series */
  getPopularSeries() {
    return this.http.get(`https://api.themoviedb.org/3/tv/popular?api_key=1f79e0878a80a22e074d66ef7ac6aeb0`);
  }
  /* get playing now series */
  getPlayingNowSeries() {
    return this.http.get(`https://api.themoviedb.org/3/tv/on_the_air?api_key=1f79e0878a80a22e074d66ef7ac6aeb0`);
  }
 
  /* i want to get the movie cast */
 MovieCast(movieId: number) {
    return this.http.get(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=1f79e0878a80a22e074d66ef7ac6aeb0`);
  }

  getmoviedetails(id: number, type: any) {
    return this.http.get(`${this.url}3/movie/${id}/${type}?api_key=1f79e0878a80a22e074d66ef7ac6aeb0`)
  }
  gettvdetails(id: number, type: any) {
    return this.http.get(`${this.url}3/tv/${id}/${type}?api_key=1f79e0878a80a22e074d66ef7ac6aeb0`)
  }
  /* get */

}


