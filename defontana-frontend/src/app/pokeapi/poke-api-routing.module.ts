import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PokeApiMainContainerComponent } from './views/poke-api-main-container/poke-api-main-container.component';

const routes: Routes = [
  { path: '**', component: PokeApiMainContainerComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class PokeApiRoutingModule {}

