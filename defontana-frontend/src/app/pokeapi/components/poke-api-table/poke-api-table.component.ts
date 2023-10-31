import { Component, OnInit } from '@angular/core';
import { PokemonApiService } from '../../services/pokemon-api.service';
import { PokemonControllerService } from '../../controllers/pokemon.controller.service';
import { Subscription } from 'rxjs';
import { CustomDataSource } from 'src/app/shared/datasource.class';
import { PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-poke-api-table',
  templateUrl: './poke-api-table.component.html',
  styleUrls: ['./poke-api-table.component.scss']
})
export class PokeApiTableComponent implements OnInit {

  selectedPokemon!: number;

  subscription = new Subscription();

  constructor(private pokemonController:PokemonControllerService,private  pokemonApiService:PokemonApiService) { }
  pokemons$ = this.pokemonController.pokemons$;
  pokemonsTable$ = new CustomDataSource<any>();

  ngOnInit(): void {
    this.subscription.add(
      this.pokemonApiService.getTotalPokemons().subscribe( response => {
          this.pokemonController.countPokemon$.next(response);
      })
    );
    this.subscription.add(
      this.pokemonController.countPokemon$.subscribe( (count:number) => {
        if(count > 0){
          this.subscription.add(this.pokemonApiService.getAllPokemons(count).subscribe( (response:any) => {
            this.pokemonController.pokemons$.next(response.results);
            this.pokemonController.countPokemonByLetter(response.results);
            this.pokemonsTable$.data.next(response.results);
            this.pokemonsTable$.filteredData.next(response.results);
            this.pokemonsTable$.setMaxPages(response.results.length);
          }))
        }
      })
    );
  }


  filter:string = "";

  getDetailPokemon(id:number | string){
    this.subscription.add(
      this.pokemonApiService.getPokemonDetailById(id).subscribe(response => {
          this.pokemonController.selectedPokemon$.next(response);
      })
    );
  }

  search($event:any){
      if(!!$event == false){
        this.pokemonsTable$.customSearch('name',"");
        return ;
      }
      if(Object.keys($event).includes("term")){
          this.pokemonsTable$.customSearch('name',$event.term);
          return ;
      }
      if(typeof $event == "string"){
        this.pokemonsTable$.customSearch('name',$event);
      }
  }

  clearFilter(){
    this.pokemonsTable$.customSearch('name',"");
  }


  verDetalle(poke:any){

  }

  setPage(page:PageEvent){
    this.pokemonsTable$.paginate(page.pageIndex)
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.pokemonsTable$.disconnect();
  }


  ngAfterViewInit(){
    this.pokemonsTable$.connect();
  }

  displayedColumns: string[] = [
    'pokedex', 'name', "ver"
  ];


}
