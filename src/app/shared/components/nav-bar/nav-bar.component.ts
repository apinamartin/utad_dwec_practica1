import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'nav-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav-bar.component.html',
  styles: ``
})
export class NavBarComponent {

  @Input() isHomePage: boolean = false;

  constructor(private router: Router) {}

  navigateToFavorites() {
    this.router.navigate(['/fav']);
  }

  @Output() searchQueryChanged = new EventEmitter<string>();

  onSearchChange(event: Event): void {
    const query = (event.target as HTMLInputElement).value;
    this.searchQueryChanged.emit(query);
  }

}
