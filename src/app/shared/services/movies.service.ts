import { Injectable } from '@angular/core';
import { PopularMoviesResponse } from '../models/movie';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.developer';
import { MovieDetails } from '../models/movie-details';
import { Observable } from 'rxjs';
import { FavoriteMovie } from '../models/favorite-movie';
import { Genre } from '../models/genre';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  _KEYFMOVIE = "favMovie"

  constructor(private http: HttpClient) { }

  getPopularMovies() {
    const url = `${environment.apiUrl}popular?api_key=${environment.api_key}`
    return this.http.get<PopularMoviesResponse>(url)
  }

  getMovieDetails(id: number): Observable<MovieDetails> {
    const url =`${environment.apiUrl}${id}?api_key=${environment.api_key}`
    return this.http.get<MovieDetails>(url)
  }

  getGenres() {
    const url =`${environment.genresUrl}?api_key=${environment.api_key}`
    return this.http.get<Genre>(url)
  }

  addToFavorites(fm: FavoriteMovie) {
    const storedFMovies = localStorage.getItem(this._KEYFMOVIE)
    let parsedFMovies: FavoriteMovie[] = []
    if (storedFMovies) {
      parsedFMovies = JSON.parse(storedFMovies)
    }
    parsedFMovies.push(fm)
    localStorage.setItem(this._KEYFMOVIE, JSON.stringify(parsedFMovies))
  }

  removeFromFavorites(movieId: number): void {
    const storedFMovies = localStorage.getItem(this._KEYFMOVIE)
    let parsedFMovies: FavoriteMovie[] = []
    if (storedFMovies) {
      parsedFMovies = JSON.parse(storedFMovies)
    }
    const updatedFMovies = parsedFMovies.filter(fm => fm.id !== movieId)
    localStorage.setItem(this._KEYFMOVIE, JSON.stringify(updatedFMovies))
  }

  isFavorite(movieId: number): boolean {
    const storedFMovies = localStorage.getItem(this._KEYFMOVIE);
    if (!storedFMovies) return false;
  
    const parsedFMovies: FavoriteMovie[] = JSON.parse(storedFMovies);
    return parsedFMovies.some(fm => fm.id === movieId);
  }

  getFavoriteMovies(): FavoriteMovie[] {
    const storedFMovies = localStorage.getItem(this._KEYFMOVIE)
    let parsedFMovies: FavoriteMovie[] = []
    if (storedFMovies) {
      parsedFMovies = JSON.parse(storedFMovies)
    }
    return parsedFMovies
  }

  loadFavoriteMovies(): FavoriteMovie[] {
    const storedFMovies = localStorage.getItem(this._KEYFMOVIE)
    let parsedFMovies: FavoriteMovie[] = []
    if (storedFMovies) {
      parsedFMovies = JSON.parse(storedFMovies)
    }
    return parsedFMovies.reverse()
  }

}
