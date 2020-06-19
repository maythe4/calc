import { Component, OnInit } from '@angular/core';
import { HistoryService, HistoryEntry } from 'src/app/services/history.service';
import { CalculationService } from 'src/app/services/calculation.service';

@Component({
  selector: 'calc-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  entries: HistoryEntry[];
  showDate: boolean;

  constructor(private historyService: HistoryService,
    private calculationService: CalculationService) { 
    this.historyService.updated$.subscribe(() => {
      this.entries = this.historyService.getHistory();
      this.showDate = this.historyService.getShowDate();
  });}

  ngOnInit(): void {
    this.entries = this.historyService.getHistory();
    this.showDate = this.historyService.getShowDate();
  }

  deleteHistory() {
    this.historyService.deleteHistory();
  }

  getFormatedDate(d: Date) {
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

  pasteFirstOperand(entry: HistoryEntry) {
    this.calculationService.pasteInput(entry.calculation.firstOperand);
  }

  pasteSecondOperand(entry: HistoryEntry) {
    this.calculationService.pasteInput(entry.calculation.secondOperand);
  }

  pasteResult(entry: HistoryEntry) {
    this.calculationService.pasteInput(entry.calculation.result.toString());
  }

  toggleShowDate() {
    this.historyService.toggleShowDate();
  }

}
