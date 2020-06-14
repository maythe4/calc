export class Calculation {
    firstOperand: string;
    firstOperandIsSet: boolean;
    operation: string;
    secondOperand: string;
    result: number;
    isCalculated: boolean;
  
    constructor() {
      this.firstOperand = '';
      this.firstOperandIsSet = false;
      this.operation = '';
      this.secondOperand = '';
      this.isCalculated = false;
    }

    handleOperand(input: string) {
        if (this.firstOperandIsSet) {
            this.secondOperand += input;
        } else {
            this.firstOperand += input;
        }
    }

    handleOperation(input: string) {
        this.operation = input;
        this.firstOperandIsSet = true;
    }

    handleBack(): boolean {
        if (this.isCalculated) {
            this.isCalculated = false;
        }

        if (this.secondOperand !== '') {
            this.secondOperand = this.secondOperand.slice(0, -1);
            return true;
        } else if (this.operation !== '') {
            this.operation = '';
            this.firstOperandIsSet = false;
            return true;
        } else if (this.firstOperand !== '') {
            this.firstOperand = this.firstOperand.slice(0, -1);
            return true;
        }

        return false; // unhandled
    }

    calculate(): boolean {
        this.isCalculated = false;
        const firstNumber = Number(this.firstOperand);
        const secondNumber = Number(this.secondOperand);
        switch (this.operation) {
            case '+':
                this.result = firstNumber + secondNumber;
                this.isCalculated = true;
                break;
            case '-':
                this.result = firstNumber - secondNumber;
                this.isCalculated = true;
                break;
            case '*':
                this.result = firstNumber * secondNumber;
                this.isCalculated = true;
                break;
            case '/':
                this.result = firstNumber / secondNumber;
                this.isCalculated = true;
                break;
        }
        return this.isCalculated;
    }
  
    toString(): string {
      let output = this.formatNumber(this.firstOperand);
      if (this.operation !== '') {
        output += ' ' + this.operation;
        if (this.secondOperand !== '') {
          output += ' ' + this.formatNumber(this.secondOperand);
          if (this.isCalculated) {
            output += ' = ' + this.numberToString(this.result);
          }
        }
      }
  
      return output;
    }

    private formatNumber(input: string): string {
        const n = Number(input);
        return this.numberToString(n);
    }

    private numberToString(input: number): string {
        const s = Intl.NumberFormat('de-DE').format(input);
        return s;
    }

  }