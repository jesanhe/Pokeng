import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  private apiUrl = 'https://localhost:8080/api/users';
  constructor(
    private pokemonService: PokemonService,
    private http: HttpClient,
    private toastr: ToastrService,
  ) {}

  ngOnInit() {}

  log() {
    this.pokemonService.getPokemons().subscribe((data) => console.log(data));
  }

  showSuccess() {
    // this.toastService.show('I am a success toast', {
    //   classname: 'bg-success text-light',
    //   delay: 10000,
    // });
    this.toastr.error('Hello world!', null, {
      onActivateTick: true,
      timeOut: 30000,
      positionClass: 'toast-bottom-center',
    });
  }

  getUsers() {
    this.http.get('urlhere').subscribe();
  }
}
