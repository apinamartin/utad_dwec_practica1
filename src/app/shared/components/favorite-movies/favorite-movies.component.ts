import { Component, OnInit } from '@angular/core';
import { MovieCardComponent } from "../movie-card/movie-card.component";
import { FavoriteMovie } from '../../models/favorite-movie';
import { MoviesService } from '../../services/movies.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'favorite-movies',
  standalone: true,
  imports: [MovieCardComponent, CommonModule],
  templateUrl: './favorite-movies.component.html',
  styles: ``
})
export class FavoriteMoviesComponent implements OnInit {

  constructor(private moviesService: MoviesService) { }

  fMovies: FavoriteMovie[] = []
  isLoading: boolean = true

  ngOnInit(): void {
    this.fMovies = this.moviesService.loadFavoriteMovies();
    this.isLoading = false
  }

  onFavoriteToggled(): void {
    this.fMovies = this.moviesService.loadFavoriteMovies(); // Recarga las películas favoritas
  }

}
