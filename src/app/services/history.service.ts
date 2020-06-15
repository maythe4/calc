import { Injectable } from '@angular/core';
import { CalculationService } from './calculation.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  entries: string[];
  private updatedSource = new Subject();
  
  updated$ = this.updatedSource.asObservable();

  constructor(private calculationService: CalculationService) { 
    this.entries = [];
    this.calculationService.calculated$.subscribe(() => {
      this.addEntry(this.calculationService.lastCalculation.toString());
      this.updatedSource.next();
    });
  }

  addEntry(text: string) {
    const content = this.getFormatedDate() + ': ' + text;
    this.entries.unshift(content);
    this.entries = this.entries.slice(0, 50);
  }

  getFormatedDate() {
    const d = new Date();
    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const day = d.getDate();
    const hour = d.getHours();
    const minute = d.getMinutes();
    const second = d.getSeconds();

    let formatedDate = '' + year;
    formatedDate += '-' + ('0' + month).substr(-2);
    formatedDate += '-' + ('0' + day).substr(-2);
    formatedDate += ' ' + ('0' + hour).substr(-2);
    formatedDate += ':' + ('0' + minute).substr(-2);
    formatedDate += ':' + ('0' + second).substr(-2);

    return formatedDate;
  }

  deleteHistory() {
    this.entries = [];
    this.updatedSource.next();
  }

}
