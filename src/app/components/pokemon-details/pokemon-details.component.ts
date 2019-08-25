import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Pokemon } from 'src/app/models/pokemon';
import { PokemonService } from 'src/app/services/pokemon.service';
import { Ability } from 'src/app/models/ability';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.scss'],
})
export class PokemonDetailsComponent implements OnInit {
  @Input() pokemon: Pokemon = {
    id: 0,
    name: '',
    base_experience: 0,
    height: 0,
    is_default: true,
    order: 0,
    weight: 0,
    abilities: [],
    forms: [],
    game_indices: [],
    held_items: [],
    location_area_encounters: [],
    moves: [],
    species: {
      name: '',
      url: '',
    },
    sprites: {
      back_female: '',
      back_shiny_female: '',
      back_default: '',
      front_female: '',
      front_shiny_female: '',
      back_shiny: '',
      front_default: '',
      front_shiny: '',
    },
    stats: [],
    types: [],
  };

  @Input() evolutionChain = [''];

  abilities = [];

  constructor(
    public activeModal: NgbActiveModal,
    private pokemonService: PokemonService,
  ) {}

  ngOnInit() {
    this.pokemon.abilities.map((ability) => {
      this.pokemonService
        .getAbility(ability.ability.url)
        // tslint:disable-next-line:no-shadowed-variable
        .subscribe((ability: Ability) =>
          this.abilities.push({
            name: ability.name,
            description: ability.effect_entries[0].effect,
          }),
        );
    });
  }
}
