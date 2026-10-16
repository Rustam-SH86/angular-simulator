import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { loadRecipes } from '../../store/recipes.actions';
import { selectError, selectLoading, selectRecipes } from '../../store/recipes.selectors';

@Component({
  selector: 'app-recipes-list',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './recipes-list.component.html',
  styleUrl: './recipes-list.component.scss',
})
export class RecipesListComponent implements OnInit {
  private readonly store = inject(Store);

  readonly recipes$ = this.store.select(selectRecipes);
  readonly loading$ = this.store.select(selectLoading);
  readonly error$ = this.store.select(selectError);

  ngOnInit(): void {
    this.loadRecipes();
  }

  reloadRecipes(): void {
    this.loadRecipes();
  }

  private loadRecipes(): void {
    this.store.dispatch(loadRecipes());
  }
}
