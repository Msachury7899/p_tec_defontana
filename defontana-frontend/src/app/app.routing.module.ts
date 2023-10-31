import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
{
  path: 'poke-api',
  loadChildren: () => import('./pokeapi/poke-api.module').then(m => m.PokeApiModule),

},
{
  path: '**',
  redirectTo: 'poke-api'
}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

