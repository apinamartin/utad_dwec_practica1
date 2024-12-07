import { Component, OnInit } from '@angular/core';
import { NavBarComponent } from "../../shared/components/nav-bar/nav-bar.component";
import { FooterComponent } from "../../shared/components/footer/footer.component";
import { MovieDetailsComponent } from "../../shared/components/movie-details/movie-details.component";
import { MovieDetails } from '../../shared/models/movie-details';
import { MoviesService } from '../../shared/services/movies.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [NavBarComponent, FooterComponent, MovieDetailsComponent],
  templateUrl: './details.component.html'
})
export class DetailsComponent {

  movieDetails!: MovieDetails
  movieId!: number
  isLoading: boolean = true;

  constructor(
    private moviesService: MoviesService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.movieId = +this.route.snapshot.paramMap.get('id')!
    console.log(this.movieId)

    if (this.movieId) {
      this.moviesService.getMovieDetails(this.movieId).subscribe({
        next: (response: MovieDetails) => {
          console.log("Todo bien", response)
          this.movieDetails = response
          this.isLoading = false
          console.log('Generos de la pelicula: ', this.movieDetails)
        },
        error: (error: any) => {
          console.log("MAAAAAAAAAL", error)
        }
      })
    } else {
      console.error("No se encontró el ID de la película en la ruta.")
    }
  }

}
