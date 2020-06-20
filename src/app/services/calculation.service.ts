import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Calculation } from './calculation';

@Injectable({
  providedIn: 'root'
})
export class CalculationService {
  currentCalculation: Calculation;
  lastCalculation: Calculation;
  private updatedSource = new Subject();
  private calculatedSource = new Subject();
  
  updated$ = this.updatedSource.asObservable();
  calculated$ = this.calculatedSource.asObservable();

  constructor() { 
    this.currentCalculation = new Calculation();
    this.lastCalculation = new Calculation();
  }

  handleInput(input: string) {
    if (this.isOperandInput(input)) {
      this.handleOperand(input);
    } else if (this.isOperationInput(input)) {
      this.handleOperation(input);
    } else if (input === '=' || input === 'Enter') {
      this.calculate();
    } else if (input === '<' || input === 'Backspace') {
      this.handleBack();
    } else if (input === 'r' || input === 'Escape') {
      this.resetCurrentCalculation();
    }
  }

  private isOperandInput(input: string): boolean {
    const possibleInputs = '1234567890.,';
    return input.length === 1 && possibleInputs.includes(input);
  }

  private handleOperand(input: string) {
    if (this.currentCalculation.isCalculated) {
      this.beginNewCalculation();
    }
    this.currentCalculation.handleOperand(input);
    this.updatedSource.next();
  }

  private isOperationInput(input: string): boolean {
    const possibleOperations = '+-*/';
    return input.length === 1 && possibleOperations.includes(input);
  }

  private handleOperation(input: string) {
    if (this.currentCalculation.firstOperand === '') {
      return;
    } else if (this.currentCalculation.isCalculated) {
      this.beginNewCalculationWithResult();
    } else if (this.currentCalculation.secondOperand !== '') {
      this.calculate();
      this.beginNewCalculationWithResult();      
    }
    this.currentCalculation.handleOperation(input);
    this.updatedSource.next();
  }

  private handleBack() {
    if (this.currentCalculation.handleBack())
    {
      this.updatedSource.next();
    }
  }

  private calculate() {
    if (this.currentCalculation.calculate())
    {
      this.lastCalculation = this.currentCalculation;
      this.updatedSource.next();
      this.calculatedSource.next();
    }
  }

  private beginNewCalculation() {
    this.currentCalculation = new Calculation();
  }

  private beginNewCalculationWithResult()
  {
    this.beginNewCalculation();
    this.currentCalculation.firstOperand = this.lastCalculation.result.toString();
  }

  resetCurrentCalculation() {
    this.currentCalculation = new Calculation();
    this.updatedSource.next();
  }

  pasteInput(input: string) {
    if (this.currentCalculation.isCalculated) {
      this.beginNewCalculation();
    }
    if (this.currentCalculation.firstOperandIsSet) {
      this.currentCalculation.secondOperand = input;
    } else {
      this.currentCalculation.firstOperand = input;
    }
    this.updatedSource.next();
  }

}
