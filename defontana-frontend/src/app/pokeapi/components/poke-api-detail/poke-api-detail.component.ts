import { Component, OnInit } from '@angular/core';
import { PokemonControllerService } from '../../controllers/pokemon.controller.service';

@Component({
  selector: 'app-poke-api-detail',
  templateUrl: './poke-api-detail.component.html',
  styleUrls: ['./poke-api-detail.component.scss']
})
export class PokeApiDetailComponent implements OnInit {


  constructor(private pokemonController:PokemonControllerService) { }
  selectedPokemon$ = this.pokemonController.selectedPokemon$;

  ngOnInit(): void {
  }

}
