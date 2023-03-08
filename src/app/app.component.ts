import { Component, ElementRef, ViewChild } from '@angular/core';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  tap,
  map,
} from 'rxjs/operators';
import { AppService } from './app.service';
import { fromEvent } from 'rxjs';
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public consoleMessages: string[] = [];
  @ViewChild('input') input: ElementRef;

  constructor(private appService: AppService) {
    this.getData();
  }

  ngAfterViewInit() {
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        filter(Boolean),
        debounceTime(3000),
        distinctUntilChanged(),
        tap(() => {
          this.getData(this.input.nativeElement.value);
        })
      )
      .subscribe();
  }

  getData(text?: string) {
    this.appService.getData().subscribe((value) => {
      this.consoleMessages = value;
      if (text) {
        this.consoleMessages = this.consoleMessages.filter((data) =>
          data.toLowerCase().includes(text.toLowerCase())
        );
      }
    });
  }
}
