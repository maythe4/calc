import { Component, OnInit } from '@angular/core';
import { CalculationService } from 'src/app/services/calculation.service';

@Component({
  selector: 'calc-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {
  output: string;

  constructor(private calculationService: CalculationService) { 
    this.resetOutput();
    this.calculationService.updated$.subscribe(() => {
      this.output = this.calculationService.currentCalculation.toString();
      if (this.output === "") {
        this.resetOutput();
      }
    });
  }

  ngOnInit(): void {
  }

  resetOutput() {
    this.output = "bereit";
  }

}
