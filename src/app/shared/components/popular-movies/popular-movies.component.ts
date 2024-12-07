import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { Movie } from '../../models/movie';
import { MovieCardComponent } from "../movie-card/movie-card.component";
import { CommonModule } from '@angular/common';
import { Genre } from '../../models/genre';

@Component({
  selector: 'popular-movies',
  standalone: true,
  imports: [MovieCardComponent, CommonModule],
  templateUrl: './popular-movies.component.html'
})
export class PopularMoviesComponent implements OnInit {

  @Input() searchQuery: string = '';
  movies: Movie[] = []
  isLoading: boolean = true;
  filteredMovies: Movie[] = [];
  genres: Genre[] = []
  selectedGenre: string = 'all'
  isSortedByVoteAverage: boolean = false

  constructor(private moviesService: MoviesService) { }

  ngOnInit(): void {
    this.moviesService.getPopularMovies().subscribe({
      next: (response: any) => {
        console.log("Todo bien", response)
        this.movies = response.results
        this.filteredMovies = [...this.movies]
        this.isLoading = false
      },
      error: (error: any) => {
        console.log("MAAAAAAAAAL", error)
      }
    })
    this.moviesService.getGenres().subscribe({
      next: (response: any) => {
        console.log("Todo bien", response)
        this.genres = response.genres
      },
      error: (error: any) => {
        console.log("MAAAAAAAAAL", error)
      }
    })
  }

  onToggleSort(event: any): void {
    this.isSortedByVoteAverage = (event.target as HTMLInputElement).checked;
    this.applyFilterAndSort();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Detectar cambios en la entrada searchQuery
    if (changes['searchQuery']) {
      this.applyFilterAndSort();
      console.log("GENEROS",this.genres)
    }
  }

  onGenreChange(event: Event): void {
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.selectedGenre = selectedValue;
    this.applyFilterAndSort();
  }

  private applyFilterAndSort(): void {
    // Filtrar las películas por título
    const query = this.searchQuery.toLowerCase();
    let filtered = this.movies.filter(movie =>
      movie.title?.toLowerCase().includes(query)
    );

    // Filtrar por género si se ha seleccionado uno
    if (this.selectedGenre !== 'all') {
      filtered = filtered.filter(movie =>
        movie.genre_ids?.includes(Number(this.selectedGenre))
      );
    }

    // Aplicar el orden si está activado
    if (this.isSortedByVoteAverage) {
      this.filteredMovies = filtered.sort((a, b) => {
        const voteA = a.vote_average ?? 0;
        const voteB = b.vote_average ?? 0;
        return voteB - voteA;
      });
    } else {
      this.filteredMovies = filtered;
    }
  }


}
