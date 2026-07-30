import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { LoaderService } from '../services/loader.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loader',
  imports: [CommonModule],
  templateUrl: './loader.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './loader.component.scss',
})
export class LoaderComponent {
  private loaderService = inject(LoaderService);
  public loader$ = this.loaderService.loader$;
}
