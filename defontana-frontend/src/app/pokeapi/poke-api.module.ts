import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokeApiTableComponent } from './components/poke-api-table/poke-api-table.component';
import { PokeApiDetailComponent } from './components/poke-api-detail/poke-api-detail.component';
import { PokeApiInfoComponent } from './components/poke-api-info/poke-api-info.component';
import { PokeApiMainContainerComponent } from './views/poke-api-main-container/poke-api-main-container.component';
import { PokeApiRoutingModule } from './poke-api-routing.module';
import {MatTableModule} from '@angular/material/table';
import { NgSelectModule } from '@ng-select/ng-select';
import {FormsModule,ReactiveFormsModule } from '@angular/forms';
import {MatToolbarModule} from '@angular/material/toolbar';
import { PokemonApiService } from './services/pokemon-api.service';
import { PokemonControllerService } from './controllers/pokemon.controller.service';
import {MatPaginatorModule} from '@angular/material/paginator';
import { ScrollingModule } from '@angular/cdk/scrolling';

@NgModule({
  imports: [
    CommonModule,
    MatTableModule,
    PokeApiRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    MatToolbarModule,
    MatPaginatorModule,
    ScrollingModule
  ],
  exports: [],
  declarations: [
    PokeApiTableComponent,
    PokeApiDetailComponent,
    PokeApiInfoComponent,
    PokeApiMainContainerComponent
  ],
  providers: [
    PokemonApiService,
    PokemonControllerService
  ]
})
export class PokeApiModule {}

