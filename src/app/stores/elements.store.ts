import { Injectable, signal, computed } from '@angular/core';
import { ElementData } from '../models/element';
import { tap, catchError, of, finalize } from 'rxjs';
import { ElementsService } from '../services/elements.service';

@Injectable({ providedIn: 'root' })
export class ElementsStore {
  private readonly DATA_URL = 'assets/element-data.json';
  private elements = signal<ElementData[]>([]);
  private filter = signal<string>('');
  loading = signal(false);

  filteredElements = computed(() => {
    const filter = this.filter().toLowerCase();
    if (!filter) return this.elements();

    return this.elements().filter(el =>
      Object.values(el).some(val =>
        val.toString().toLowerCase().includes(filter)
      )
    );
  });

  constructor(private elementsService: ElementsService) {}

  loadElements() {
    this.loading.set(true);
    this.elementsService.getElements().pipe(
      tap(data => this.elements.set(data)),
      catchError(() => {
        console.error('Error loading elements');
        return of([]);
      }),
      finalize(() => this.loading.set(false))
    ).subscribe();
  }

  setFilter(value: string) {
    this.filter.set(value);
  }

  updateElement(updated: ElementData) {
    this.elements.update(elements =>
      elements.map(el => (el.position === updated.position ? updated : el))
    );
  }
}
