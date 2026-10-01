import { Component, DestroyRef, inject, output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map } from 'rxjs';

@Component({
  selector: 'app-user-filter',
  imports: [ReactiveFormsModule],
  templateUrl: './user-filter.component.html',
  styleUrl: './user-filter.component.scss',
})
export class UserFilterComponent {
  private destroyRef = inject(DestroyRef);
  filterChange = output<string>();

  searchControl = new FormControl<string>('', {
    nonNullable: true,
  });

  constructor() {
    this.searchControl.valueChanges
      .pipe(
        map((value: string) => value.trim().toLowerCase()),
        debounceTime(200),
        distinctUntilChanged(),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((value: string) => {
        this.filterChange.emit(value);
      });
  }
}
