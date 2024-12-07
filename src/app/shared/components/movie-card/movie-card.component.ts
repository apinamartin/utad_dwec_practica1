import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Movie } from '../../models/movie';
import { environment } from '../../../../environments/environment.developer';
import { Router } from '@angular/router';
import { FavoriteMovie } from '../../models/favorite-movie';
import { MoviesService } from '../../services/movies.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'movie-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-card.component.html'
})
export class MovieCardComponent {

  environment = environment

  @Input() movie?: Movie | FavoriteMovie
  @Output() favoriteToggled = new EventEmitter<void>()

  constructor(private router: Router, public moviesService: MoviesService) {}

  navigateToDetails(): void {
    this.router.navigate(['/details', this.movie?.id])
  }

  onFavClick() {
    console.log(this.movie)

    const fMovie: FavoriteMovie = {
      id: this.movie?.id,
      poster_path: this.movie?.poster_path,
      title: this.movie?.title
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
    this.favoriteToggled.emit()
    console.log(fMovie)
  }

}
