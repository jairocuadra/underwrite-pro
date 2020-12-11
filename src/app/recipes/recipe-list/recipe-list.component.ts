import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe(
      'A  test Recipe',
      'This is simply a test',
      'https://www.simplyrecipes.com/wp-content/uploads/2006/08/HT-Cut-A-Mango-LEAD-1.jpg'
    ),
    new Recipe(
      'A  test Recipe',
      'This is simply a test',
      'https://www.simplyrecipes.com/wp-content/uploads/2006/08/HT-Cut-A-Mango-LEAD-1.jpg'
    ),
  ];

  constructor() {}

  ngOnInit(): void {}
}
