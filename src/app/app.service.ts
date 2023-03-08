import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

Injectable();
export class AppService {
  constructor() {}

  getData() {
    return of(['Hola', 'Chau', 'Adios', 'Buenas noches']).pipe(delay(500));
  }
}
