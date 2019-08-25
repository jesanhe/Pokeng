import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss'],
})
export class PokemonCardComponent implements OnInit {
  @Input() pokemon;

  defaultImage: string;
  pokemonName: string;

  constructor() {}

  ngOnInit() {
    console.log(this.pokemon);
    this.defaultImage = this.pokemon.sprites.front_default;
    this.pokemonName = this.pokemon.name;
  }
}
