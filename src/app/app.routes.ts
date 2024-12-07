import { Routes } from '@angular/router';
import { HomeComponent } from './public/home/home.component';
import { DetailsComponent } from './public/details/details.component';
import { FavoritesComponent } from './public/favorites/favorites.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        pathMatch: 'full'
    },
    {
        path: 'details/:id',
        component: DetailsComponent
    },
    {
        path: 'fav',
        component: FavoritesComponent
    }
];
