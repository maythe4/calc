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

  allowsPoint = () => this.calculationService.currentCalculation.allowsPoint();
  allowsReset = () => this.calculationService.currentCalculation.allowsReset();
  allowsZero = () => this.calculationService.currentCalculation.allowsZero();
  allowsOperations = () => this.calculationService.currentCalculation.allowsOperations();
  allowsEquals = () => this.calculationService.currentCalculation.allowsEquals();
  allowsBack = () => this.calculationService.currentCalculation.allowsBack();

}
