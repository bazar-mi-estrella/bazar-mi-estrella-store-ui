import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-nice-select',
  templateUrl: './nice-select.component.html',
  styleUrls: ['./nice-select.component.scss'],
})
export class NiceSelectComponent implements OnChanges {
  @Input() options: any[] = [];
  @Input() defaultCurrent: number = 0;
  @Input() placeholder: string = '';
  @Input() className: string = '';
  @Input() name: string = '';

  open = false;
  current: { id: string; name: string } | undefined;

  @Output() onChange: EventEmitter<{ id: string; name: string } | any> = new EventEmitter();

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['options']) {//Para limpiar el selector
      if(this.options && this.options.length == 0) {
        this.current = undefined;
      }
    }
  }

  toggleOpen() {
    this.open = !this.open;
  }

  stopPropagation(event: Event) {
    event.stopPropagation();
  }

  ngOnInit() {
    this.current = this.options[this.defaultCurrent];
  }

  currentHandler(item: { id: string; name: string }, index: number) {
    this.current = this.options[index];
    this.onChange.emit(item); // Emitting the event
    this.onClose();
  }

  onClose() {
    this.open = false;
  }
}
