import { Injectable } from '@angular/core';
import { HistoryEntry, HistoryService } from './history.service';

export interface DataCalc {
  showHistoryDate: boolean;
  history: HistoryEntry[];
}

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private readonly storageObjectName: string = 'dataCalc';

  constructor(
    private historyService: HistoryService
  ) {
    this.historyService.updated$.subscribe(() => { this.saveData(); });
  }
  
  loadData() {
    const data: DataCalc = JSON.parse(localStorage.getItem(this.storageObjectName));
    if (data !== undefined && data !== null) {
      const dataHistoryString = JSON.stringify(data.history);
      const currentHistoryString = JSON.stringify(this.historyService.getHistory());
      if (dataHistoryString !== currentHistoryString)
      {
        this.historyService.setHistory(data.history);
      }

      if (data.showHistoryDate !== this.historyService.getShowDate()) {
        this.historyService.setShowDate(data.showHistoryDate);
      }
    }
  }

  saveData() {
    let shouldSave: Boolean = true;

    const savedData: DataCalc = JSON.parse(localStorage.getItem(this.storageObjectName));
    if (savedData !== undefined && savedData !== null) {
      const dataHistoryString = JSON.stringify(savedData.history);
      const currentHistoryString = JSON.stringify(this.historyService.getHistory());

      if (this.historyService.getShowDate() === savedData.showHistoryDate &&
          dataHistoryString === currentHistoryString) {

        shouldSave = false;
      }
    }

    if (shouldSave)
    {
      const newData: DataCalc = {
        showHistoryDate: this.historyService.getShowDate(),
        history: this.historyService.getHistory()
      };
      localStorage.setItem(this.storageObjectName, JSON.stringify(newData));
    }

  }

}
