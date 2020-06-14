import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'calc-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {
  output: string;

  constructor() { }

  ngOnInit(): void {
    this.output = "1 + 1"; // TODO read from service
  }

}
