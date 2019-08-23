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
  waka: Observable<{}>;

  constructor(pokeService: PokemonService) {
    pokeService.getAllPokemon().subscribe((data) => console.log(data));
  }

  ngOnInit() {

  }
}
