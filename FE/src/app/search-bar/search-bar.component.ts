import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})

export class SearchBarComponent implements OnInit {
  isChecked: boolean;
  text: string;

  @Output() search: EventEmitter<string> = new EventEmitter<string>();
  @Output() showInstockOnly: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
    this.isChecked  = false;
    this.text = '';
  }

  onTextChanged() {
    this.search.emit(this.text);
  }

  onCheckboxChanged() {
    this.showInstockOnly.emit(this.isChecked);
  }
}
