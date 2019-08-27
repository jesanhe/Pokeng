import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { NgbAlertConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
})
export class PokemonListComponent implements OnInit {
  pokemonList;

  constructor(
    private pokemonService: PokemonService,
    private alertConfig: NgbAlertConfig,
  ) {
    alertConfig.type = 'danger';
    alertConfig.dismissible = false;
  }

  ngOnInit() {
    this.pokemonService
      .getPokemons()
      .subscribe((pokemonList) => (this.pokemonList = pokemonList));
  }
}
