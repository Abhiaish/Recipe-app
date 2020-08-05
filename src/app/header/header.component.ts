import { Component } from '@angular/core';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
constructor(private data:DataService){}
  saveData(){
    this.data.saveRecipes()
  }
  fetchData(){
    this.data.fetchRecipes().subscribe()
  }
}
