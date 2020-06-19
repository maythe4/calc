import { Component } from '@angular/core';
import { StorageService } from './services/storage.service';

@Component({
  selector: 'calc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'calc';

  constructor(private storageService: StorageService) { }

  ngOnInit() {
    this.storageService.loadData();
  }
}
