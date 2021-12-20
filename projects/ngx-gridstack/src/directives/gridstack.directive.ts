import {
    ElementRef,
    OnInit,
    Output,
    EventEmitter,
    Input,
    OnChanges,
    SimpleChanges,
    Directive,
    HostBinding,
} from '@angular/core';
import type {
    GridItemHTMLElement,
    GridStackNode,
    GridStackOptions,
    GridStackWidget,
    numberOrString,
} from 'gridstack';
import { GridStack } from 'gridstack';
import 'gridstack/dist/gridstack-h5';
import 'gridstack/dist/h5/gridstack-dd-native';
import { debounce } from '../utils/debounce';
import { uniqueId } from '../utils/uniqueId';

import type { GridStackItemDirective } from './gridstack-item.directive';

export interface HTMLDivElementEx extends HTMLDivElement {
    gsId?: numberOrString;
}

type TGridItemEl = GridItemHTMLElement | GridStackNode | GridStackNode[] | undefined;

@Directive({
    selector: '[gridStack]',
    exportAs: 'gridStack',
})
export class GridStackDirective implements OnInit, OnChanges {
    public uid = uniqueId('gridStack');

    @HostBinding('class.grid-stack') gridStackClass = true;
    @HostBinding('class.inited') inited = false;

    @Input() gridStack?: GridStackOptions;
    /**
     * Occurs when widgets change their position/size due to constrain or direct changes
     */
    @Output() gridItemsChange = new EventEmitter<GridStackWidget[]>();
    /**
     * Called when widgets are being added to a grid
     */
    @Output() onAdded = new EventEmitter<{
        event: Event;
        items: TGridItemEl;
    }>();
    @Output() onDisable = new EventEmitter<boolean>();
    /**
     * called when grid item is starting to be dragged
     */
    @Output() onDragstart = new EventEmitter<{
        event: Event;
        el: TGridItemEl;
    }>();
    /**
     * called after the user is done moving the item, with updated DOM attributes.
     */
    @Output() onDragstop = new EventEmitter<{
        event: Event;
        el: TGridItemEl;
    }>();

    @Output() onDropped = new EventEmitter<{
        event: Event;
        previousWidget: TGridItemEl;
        newWidget: TGridItemEl;
    }>();

    @Output() onResizestart = new EventEmitter<{
        event: Event;
        el: TGridItemEl;
    }>();

    @Output() onResizestop = new EventEmitter<{
        event: Event;
        el: TGridItemEl;
    }>();

    private gridStackItems: GridStackItemDirective[] = [];

    constructor(private el: ElementRef<HTMLDivElement>) {}

    private grid?: GridStack;

    public makeWidgetDebounce = debounce(() => {
        this.grid?.batchUpdate();

        const preItem = JSON.stringify(this.getCurrentDataItems());

        // this.grid?.removeWidget
        this.grid?.removeAll();
        this.gridStackItems.forEach((i) => {
            i.isRegistered = false;
        });

        this.gridStackItems.forEach((item) => {
            if (!item.isRegistered) {
                this.grid?.makeWidget(item.el.nativeElement);
                item.isRegistered = true;
                item.update();
            }
        });
        this.grid?.commit();
        const newItems = this.getCurrentItems();
        if (JSON.stringify(newItems) !== preItem) {
            this.updateChange();
        }
    });

    public registerWidget(gridStackItem: GridStackItemDirective): void {
        if (!this.gridStackItems.includes(gridStackItem)) {
            this.gridStackItems.push(gridStackItem);
        }
    }

    public unregisterWidget(gridStackItem: GridStackItemDirective): void {
        this.gridStackItems = this.gridStackItems.filter((i) => i !== gridStackItem);
    }

    private getCurrentDataItems(): GridStackWidget[] {
        return (this.gridStackItems || [])
            .map((item) => {
                const { data } = item;
                return data;
            })
            .filter((i) => i) as GridStackWidget[];
    }

    private getCurrentItems(): GridStackWidget[] {
        return this.grid
            ?.getGridItems()
            .map((item) => {
                const { gridstackNode } = item;
                const gridStackItem = this.gridStackItems.find((i) => i.el.nativeElement === item);
                if (gridStackItem && gridstackNode) {
                    const { data } = gridStackItem;
                    const { x, y, w, h } = gridstackNode;
                    return { ...data, x, y, w, h };
                }
                return undefined;
            })
            .filter((i) => i) as GridStackWidget[];
    }

    public trackById(idx: number, value: GridStackWidget): string | number | undefined {
        return value?.id;
    }

    private updateChange(): void {
        if (!this.inited) {
            this.inited = true;
            return;
        }
        const currentItems = this.getCurrentItems();
        if (this.gridItemsChange.observed) {
            this.gridItemsChange.emit(currentItems);
        } else {
            this.gridStackItems.forEach((item) => {
                const { id } = item.data;
                const currentItem = currentItems.find((i) => i.id === id);
                if (currentItem) {
                    Object.assign(item.data, currentItem);
                }
            });
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.gridStack) {
            if (this.grid) {
                this.grid.off('change');

                this.grid.destroy(false);
            }
            this.grid = GridStack.init(
                {
                    resizable: {
                        autoHide: true,
                        handles: 'e, se, s, sw, w, n, ne, nw',
                    },
                    ...changes.gridStack.currentValue,
                },
                this.el.nativeElement,
            );

            // Events
            this.grid.on('change', () => this.updateChange());
            // this.grid.on('added', (event, items) => this.onAdded.emit({ event, items }));
            this.grid.on('disable', () => this.onDisable.emit(true));
            this.grid.on('enable', () => this.onDisable.emit(false));
            this.grid.on('dragstart', (event, el) => this.onDragstart.emit({ event, el }));
            this.grid.on('dragstop', (event, el) => this.onDragstop.emit({ event, el }));
            this.grid.on('dropped', (event, previousWidget, newWidget) =>
                this.onDropped.emit({ event, previousWidget, newWidget }),
            );
            this.grid.on('resizestart', (event, el) => this.onResizestart.emit({ event, el }));
            this.grid.on('resizestop', (event, el) => this.onResizestop.emit({ event, el }));

            this.makeWidgetDebounce();
        }
    }

    ngOnInit(): void {
        // this.el.nativeElement.classList.add('grid-stack');
    }
}
