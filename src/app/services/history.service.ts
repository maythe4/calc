import { Injectable } from '@angular/core';
import { CalculationService } from './calculation.service';
import { Subject } from 'rxjs';
import { Calculation } from './calculation';

export interface HistoryEntry {
  date: Date;
  calculation: Calculation;
}

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  entries: HistoryEntry[];
  private updatedSource = new Subject();
  
  updated$ = this.updatedSource.asObservable();

  constructor(private calculationService: CalculationService) { 
    this.entries = [];
    this.calculationService.calculated$.subscribe(() => {
      this.addEntry(this.calculationService.lastCalculation);
      this.updatedSource.next();
    });
  }

  addEntry(calculation: Calculation) {
    const entry: HistoryEntry = {
      date: new Date(),
      calculation: calculation
    };
    this.entries.unshift(entry);
    this.entries = this.entries.slice(0, 50);
  }

  deleteHistory() {
    this.entries = [];
    this.updatedSource.next();
  }

}
