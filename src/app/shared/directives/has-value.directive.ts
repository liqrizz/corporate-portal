import {AfterViewInit, Directive, ElementRef, HostListener} from '@angular/core';
import {debounce} from '@core/util/decorators';

@Directive({
  selector: '[appHasValue]',
})
export class HasValueDirective implements AfterViewInit {
  currentInput: HTMLInputElement;

  constructor(public input: ElementRef<HTMLInputElement>) {
  }

  @HostListener('focus') focus(): void {
    if (this.currentInput.classList.contains('has-value')) {
      return;
    }
    this.currentInput.classList.add('has-value');
  }

  @HostListener('focusout') focusout(): void {
    if (this.currentInput.value || this.currentInput.value !== '') {
      return;
    }
    this.currentInput.classList.remove('has-value');
  }

  @debounce(0) hasValue(): void {
    this.currentInput = this.input.nativeElement;
    if (this.currentInput.value || this.currentInput.value !== '') {
      this.currentInput.classList.add('has-value');
      return;
    }
    this.currentInput.classList.remove('has-value');
  }

  ngAfterViewInit(): void {
    this.hasValue();
  }
}
