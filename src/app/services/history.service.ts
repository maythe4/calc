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
  private entries: HistoryEntry[];
  private showDate: boolean;
  private updatedSource = new Subject();
  
  updated$ = this.updatedSource.asObservable();

  constructor(private calculationService: CalculationService) { 
    this.entries = [];
    this.showDate = false;
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

  toggleShowDate() {
    this.showDate = !this.showDate;
    this.updatedSource.next();
  }

  getHistory(): HistoryEntry[] {
    return this.entries;
  }

  setHistory(entries: HistoryEntry[]) {
    this.entries = entries;
    this.entries.forEach(entry => {
      const calculation = new Calculation();
      calculation.firstOperand = entry.calculation.firstOperand;
      calculation.handleOperation(entry.calculation.operation);
      calculation.secondOperand = entry.calculation.secondOperand;
      calculation.calculate();
      entry.calculation = calculation;
      entry.date = new Date(entry.date);
    });
    this.updatedSource.next();
  }

  getShowDate(): boolean {
    return this.showDate;
  }

  setShowDate(showDate: boolean) {
    this.showDate = showDate;
  }

}
