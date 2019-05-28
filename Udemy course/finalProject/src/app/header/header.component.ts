import {Component} from '@angular/core';
import {SrverService} from '../shared/srver.service';
import {RecipesService} from '../recipes/recipes.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  constructor( private serverService : SrverService,
               private recipeService : RecipesService){

  }

  onSave() {
  this.serverService.saveData().subscribe(
    (resolve: Response) => {
      console.log(resolve.body);
    }
  )
  }
}
