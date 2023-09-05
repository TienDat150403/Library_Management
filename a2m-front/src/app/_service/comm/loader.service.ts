import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  public isLoading = new BehaviorSubject(false);
  constructor() { }

  change(isLoad: boolean) {
    this.isLoading.next(isLoad);
  }
}
