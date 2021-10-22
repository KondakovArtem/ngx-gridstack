import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import type { GridStackWidget } from 'gridstack';
import { GridstackComponent, HTMLDivElementEx } from './gridstack.component';

@Component({
  selector: 'div[gridstackItem]',
  templateUrl: './gridstack-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridstackItemComponent implements OnInit, OnChanges, OnDestroy {
  constructor(
    private gridStack: GridstackComponent,
    public el: ElementRef<HTMLDivElementEx>,
    private cdr: ChangeDetectorRef
  ) {}

  public update() {
    this.cdr.detectChanges();
  }

  @Input() data!: GridStackWidget;

  public isRegistered = false;

  public updateGridAttr(data: GridStackWidget = this.data) {
    this.el.nativeElement.setAttribute('gs-w', `${data.w || 1}`);
    this.el.nativeElement.setAttribute('gs-h', `${data.h || 1}`);
    this.el.nativeElement.setAttribute('gs-x', `${data.x || 0}`);
    this.el.nativeElement.setAttribute('gs-y', `${data.y || 0}`);
    data.minH
      ? this.el.nativeElement.setAttribute('gs-min-h', `${data.minH}`)
      : this.el.nativeElement.removeAttribute('gs-min-h');
    data.maxH
      ? this.el.nativeElement.setAttribute('gs-max-h', `${data.maxH}`)
      : this.el.nativeElement.removeAttribute('gs-max-h');
    data.minW
      ? this.el.nativeElement.setAttribute('gs-min-w', `${data.minW}`)
      : this.el.nativeElement.removeAttribute('gs-min-w');
    data.maxW
      ? this.el.nativeElement.setAttribute('gs-max-w', `${data.maxW}`)
      : this.el.nativeElement.removeAttribute('gs-max-w');

    if (!this.isRegistered) {
      this.gridStack.registerWidget(this);
    }
    this.gridStack.makeWidgetDebounce();
  }

  ngOnChanges(change: SimpleChanges) {
    debugger;
    if (change.data) {
      const { currentValue } = change.data;
      this.updateGridAttr(currentValue);
    }
  }
  ngOnDestroy(): void {
    this.gridStack.unregisterWidget(this);
  }
  ngOnInit() {}
}
