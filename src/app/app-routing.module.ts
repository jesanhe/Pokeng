import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';

const routes: Routes = [
  {
    path: 'pokemon-list',
    component: PokemonListComponent,
  },
  { path: '', redirectTo: '/pokemon-list', pathMatch: 'full' },
  { path: '**', redirectTo: '/pokemon-list', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
