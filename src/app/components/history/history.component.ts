import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'calc-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  entries: string[];

  constructor() { }

  ngOnInit(): void {
    this.entries = [
      "2020-06-14 13:03:27: 1 + 1 = 2",
      "2020-06-14 13:03:44: 2 + 2 = 4"];
  }

}
