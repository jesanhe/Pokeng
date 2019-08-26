import { Component, OnInit } from '@angular/core';
import { PokemonService } from './services/pokemon.service';
import { Observable } from 'rxjs';
import { ToastService } from './services/toast.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Pokeng';
  pokemonList;

  constructor(
    private pokeService: PokemonService,
  ) // public toastService: ToastService,
  {}

  ngOnInit() {
    this.pokemonList = this.pokeService.getPokemons();
    // .subscribe((data) => this.pokemonList = data);
  }
}
