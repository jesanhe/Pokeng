import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  constructor(private pokemonService: PokemonService) {}

  ngOnInit() {}

  log() {
    this.pokemonService.getPokemons().subscribe((data) => console.log(data));
  }
}
