import { Component, OnInit } from '@angular/core';
import { HistoryService } from 'src/app/services/history.service';

@Component({
  selector: 'calc-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  entries: string[];

  constructor(private historyService: HistoryService) { 
    this.historyService.updated$.subscribe(() => {
    this.entries = this.historyService.entries;
  });}

  ngOnInit(): void {
    this.entries = [];
  }

  deleteHistory() {
    this.historyService.deleteHistory();
  }

}
