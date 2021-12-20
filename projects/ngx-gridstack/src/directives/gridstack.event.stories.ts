import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { GridStackOptions } from 'gridstack';
import cloneDeep from 'lodash/cloneDeep';
import merge from 'lodash/merge';
import { Component, Input } from '@angular/core';
// import safeJsonStringify from 'safe-json-stringify';

import { GridStackDirective } from './gridstack.directive';
import { GridStackModule } from './gridstack.module';
import { JsonPipeModule } from '../pipe/json.module';

@Component({
    selector: 'grid-event-story',
    template: `<div
        [gridStack]="gridStackOptions"
        #gridStack="gridStack"
        (onAdded)="onAdded(safeJson($event))"
        (onDisable)="onDisable(safeJson($event))"
        (onDragstart)="onDragstart(safeJson($event))"
        (onDragstop)="onDragstop(safeJson($event))"
        (onDropped)="onDropped(safeJson($event))"
        (onResizestart)="onResizestart(safeJson($event))"
        (onResizestop)="onResizestop(safeJson($event))"
        (gridItemsChange)="gridItemsChange(safeJson($event)); items = $event"
    >
        <div gridStackItem [data]="item" *ngFor="let item of items; trackBy: gridStack.trackById">
            <div class="grid-stack-item-content">
                Item
                <div>{{ item | safeJson }}</div>
            </div>
        </div>
    </div>`,
})
class AStoryComponent {
    @Input() items: any;
    @Input() gridstack: any;

    public safeJson($emit: any): string {
        const res = {
            ...$emit,
            event: {
                ...$emit.event,
                target: null,
            },
            el: null,
            items: ($emit.items || []).map((item: any) => ({
                ...item,
                el: null,
                grid: null,
            })),
        };

        return res;
    }
}

export default {
    title: 'GridStack',
    component: AStoryComponent,
    decorators: [
        moduleMetadata({
            declarations: [],
            imports: [CommonModule, GridStackModule, JsonPipeModule],
        }),
    ],
    argTypes: {
        gridItemsChange: { action: 'gridItemsChange' },
        onAdded: { action: 'onAdded' },
        onDisable: { action: 'onDisable' },
        onDragstart: { action: 'onDragstart' },
        onDragstop: { action: 'onDragstop' },
        onDropped: { action: 'onDropped' },
        onResizestart: { action: 'onResizestart' },
        onResizestop: { action: 'onResizestop' },
    },
} as Meta;

const defOpts = {
    args: {
        items: [
            {
                id: 1,
                x: 2,
                y: 0,
                minW: 2,
            },
            {
                id: 2,
                x: 4,
                y: 0,
            },
            {
                id: 3,
                x: 5,
                y: 2,
            },
        ],
        gridstack: {
            margin: 10,
            disableDrag: false,
            disableResize: false,
            auto: true,
            float: true,
            animate: true,
        } as GridStackOptions,
    },
};

const TemplateEvents: Story<GridStackDirective> = (props) => ({
    props,
    styles: [
        `.grid-stack-item-content {
      font-size: 10px;
    }
    .grid-stack {
      background: yellow;
    }
  `,
    ],
});

export const Events = TemplateEvents.bind({});
Object.assign(Events, merge({}, cloneDeep(defOpts)));
