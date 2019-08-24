import { Component, OnInit } from '@angular/core';
import { PokemonService } from './services/pokemon.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Pokeng';
  pokemonList;

  constructor(private pokeService: PokemonService) {}

  ngOnInit() {
    this.pokeService.getAllPokemon().subscribe((data) => this.pokemonList = data);
  }
}
