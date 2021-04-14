import {Inject, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private storage;

  constructor() {
    this.storage = localStorage;
  }

  getItem(key): string {
    return this.storage.getItem(key);
  }

  setItem(key, object): void {
    this.storage.setItem(key, object);
  }

  removeItem(key): void {
    this.storage.removeItem(key);
  }

  checkExists(key): boolean {
    return !!this.getItem(key);
  }
}
