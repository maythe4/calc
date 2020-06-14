import { Injectable } from '@angular/core';

export enum OperationType {
  Addition,
  Subtraction,
  Multiplication,
  Division
}

@Injectable({
  providedIn: 'root'
})
export class CalculationService {
  firstOperand: number;
  firstInput: string;
  firstOperandIsSet: boolean;
  operation: OperationType;
  secondOperand: number;
  secondInput: string;

  constructor() { }

  handleInput(input: string) {
    if (this.IsOperandInput(input)) {
      this.firstOperandIsSet ? this.secondInput += input : this.firstInput += input;
    }
    else if (this.IsOperationInput(input)) {
      // TODO translate operation
    }
    else if (input === "=") {
      // TODO calculate
    }
  }

  private IsOperandInput(input: string): boolean {
    const possibleInputs = "1234567890.,";
    return input.length === 1 && possibleInputs.includes(input);
  }

  private IsOperationInput(input: string): boolean {
    const possibleOperations = "+-*/"
    return input.length === 1 && possibleOperations.includes(input);
  }

}
