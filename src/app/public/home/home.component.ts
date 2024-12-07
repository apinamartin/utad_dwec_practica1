import { Component } from '@angular/core';
import { NavBarComponent } from "../../shared/components/nav-bar/nav-bar.component";
import { PopularMoviesComponent } from "../../shared/components/popular-movies/popular-movies.component";
import { FooterComponent } from '../../shared/components/footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavBarComponent, PopularMoviesComponent, FooterComponent],
  templateUrl: './home.component.html'
})
export class HomeComponent {

  isHomePage: boolean = true;
  searchQuery: string = '';

  onSearchQueryChanged(query: string): void {
    this.searchQuery = query;
  }

}
