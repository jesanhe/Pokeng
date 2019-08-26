import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
  filter,
  catchError,
  map,
  startWith,
  debounceTime,
  distinctUntilChanged,
  switchMap,
} from 'rxjs/operators';
import { of, Observable, combineLatest, Subject } from 'rxjs';
import { Pokemon } from 'src/app/models/pokemon';
import { FormControl } from '@angular/forms';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(private pokemonService: PokemonService) {}

  ngOnInit() {}

  search(term: string) {
    this.pokemonService.search(term);
  }

  omitSpecialChar(event) {
    const key = event.charCode;
    return (
      (key > 64 && key < 91) ||
      (key > 96 && key < 123) ||
      key === 8 ||
      key === 32 ||
      key === 63 ||
      (key >= 48 && key <= 57)
    );
  }
}
