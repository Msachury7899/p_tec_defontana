import { Component, OnInit } from '@angular/core';
import { PokemonControllerService } from '../../controllers/pokemon.controller.service';

@Component({
  selector: 'app-poke-api-info',
  templateUrl: './poke-api-info.component.html',
  styleUrls: ['./poke-api-info.component.scss']
})
export class PokeApiInfoComponent implements OnInit {

  constructor(private pokemonController:PokemonControllerService) { }
  letterCountPokemon$ = this.pokemonController.letterCountPokemons$;

  

  ngOnInit(): void {
    
  }



}
