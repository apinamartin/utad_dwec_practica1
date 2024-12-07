import { Component, Input } from '@angular/core';
import { environment } from '../../../../environments/environment.developer';
import { MovieDetails } from '../../models/movie-details';
import { MoviesService } from '../../services/movies.service';
import { FavoriteMovie } from '../../models/favorite-movie';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'movie-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-details.component.html'
})
export class MovieDetailsComponent {

  environment = environment
  @Input() movieDetails?: MovieDetails
  @Input() isLoading: boolean = true;

  constructor(public moviesService: MoviesService) { }

  onFavClick() {
    console.log(this.movieDetails)

    const fMovie: FavoriteMovie = {
      id: this.movieDetails?.id,
      poster_path: this.movieDetails?.poster_path,
      title: this.movieDetails?.title
    }

    if (fMovie.id === undefined) {
      console.error('La película no tiene un ID válido');
      return;
    }

    if (this.moviesService.isFavorite(fMovie.id)) {
      this.moviesService.removeFromFavorites(fMovie.id)
      console.log("Película eliminada de favoritos:", fMovie)
    } else {
      this.moviesService.addToFavorites(fMovie)
      console.log("Película añadida a favoritos:", fMovie)
    }

    console.log(fMovie)
  }

}
