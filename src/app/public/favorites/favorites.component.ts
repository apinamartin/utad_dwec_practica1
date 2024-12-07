import { Component } from '@angular/core';
import { NavBarComponent } from "../../shared/components/nav-bar/nav-bar.component";
import { FooterComponent } from "../../shared/components/footer/footer.component";
import { FavoriteMoviesComponent } from "../../shared/components/favorite-movies/favorite-movies.component";

@Component({
  selector: 'favorites',
  standalone: true,
  imports: [NavBarComponent, FooterComponent, FavoriteMoviesComponent],
  templateUrl: './favorites.component.html',
  styles: ``
})
export class FavoritesComponent {

}
