import { Component, ElementRef, ViewChild } from '@angular/core';
import { debounceTime, tap } from 'rxjs/operators';
import { AppService } from './app.service';
import { fromEvent } from 'rxjs';
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public messages: string[] = [];
  public messagesShow: string[] = [];
  @ViewChild('input') input: ElementRef;

  constructor(private appService: AppService) {
    this.getData();
  }

  getData(): void {
    this.appService.getData().subscribe((value) => {
      this.messages = value;
      this.messagesShow = value;
    });
  }

  ngAfterViewInit() {
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        debounceTime(3000),
        tap(() => {
          this.searchData(this.input.nativeElement.value);
        })
      )
      .subscribe();
  }

  searchData(text: string) {
    this.messagesShow = this.messages.filter((data) =>
      data.toLowerCase().includes(text.toLowerCase())
    );
  }
}
