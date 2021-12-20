import {
    ChangeDetectorRef,
    Directive,
    ElementRef,
    Input,
    OnChanges,
    OnDestroy,
    SimpleChanges,
} from '@angular/core';
import type { GridStackWidget } from 'gridstack';
import { GridStackDirective, HTMLDivElementEx } from './gridstack.directive';

@Directive({
    selector: '[gridStackItem]',
})
export class GridStackItemDirective implements OnChanges, OnDestroy {
    constructor(
        private gridStack: GridStackDirective,
        public el: ElementRef<HTMLDivElementEx>,
        private cdr: ChangeDetectorRef,
    ) {}

    public update(): void {
        this.cdr.detectChanges();
    }

    @Input() data!: GridStackWidget;

    public isRegistered = false;

    public updateGridAttr(data: GridStackWidget = this.data): void {
        this.el.nativeElement.setAttribute('gs-w', `${data.w || 1}`);
        this.el.nativeElement.setAttribute('gs-h', `${data.h || 1}`);
        this.el.nativeElement.setAttribute('gs-x', `${data.x || 0}`);
        this.el.nativeElement.setAttribute('gs-y', `${data.y || 0}`);
        if (data.minH) this.el.nativeElement.setAttribute('gs-min-h', `${data.minH}`);
        else this.el.nativeElement.removeAttribute('gs-min-h');

        if (data.maxH) this.el.nativeElement.setAttribute('gs-max-h', `${data.maxH}`);
        else this.el.nativeElement.removeAttribute('gs-max-h');

        if (data.minW) this.el.nativeElement.setAttribute('gs-min-w', `${data.minW}`);
        else this.el.nativeElement.removeAttribute('gs-min-w');

        if (data.maxW) this.el.nativeElement.setAttribute('gs-max-w', `${data.maxW}`);
        else this.el.nativeElement.removeAttribute('gs-max-w');

        if (!this.isRegistered) {
            this.gridStack.registerWidget(this);
        }
        this.gridStack.makeWidgetDebounce();
    }

    ngOnChanges(change: SimpleChanges): void {
        if (change.data) {
            const { currentValue } = change.data;
            this.updateGridAttr(currentValue);
        }
    }
    ngOnDestroy(): void {
        this.gridStack.unregisterWidget(this);
    }
}
