import { Component, OnInit } from '@angular/core';
import { CalculationService } from 'src/app/services/calculation.service';

@Component({
  selector: 'calc-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.css']
})
export class ButtonsComponent implements OnInit {

  constructor(private calculationService: CalculationService) { }

  ngOnInit(): void {
  }

  handleClick(input: string) {
    this.calculationService.handleInput(input);
  }

  allowsPoint(): boolean {
    return this.calculationService.currentCalculation.allowsPoint();
  }

}
