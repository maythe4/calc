import { Component, HostListener } from '@angular/core';
import { StorageService } from './services/storage.service';
import { CalculationService } from './services/calculation.service';

@Component({
  selector: 'calc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'calc';

  constructor(
    private storageService: StorageService,
    private calculationService: CalculationService
  ) { }

  ngOnInit() {
    this.storageService.loadData();
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    //console.log(event.key);
    this.calculationService.handleInput(event.key); 
  }
}
