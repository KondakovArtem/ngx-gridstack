import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { GridStackOptions } from 'gridstack';
import cloneDeep from 'lodash/cloneDeep';
import merge from 'lodash/merge';

import { GridstackComponent } from './gridstack.component';
import { NgGridstackModule } from './gridstack.module';
import { JsonPipeModule } from '../pipe/json.module';

export default {
    title: 'GridStack',
    component: GridstackComponent,
    decorators: [
        moduleMetadata({
            declarations: [],
            imports: [CommonModule, NgGridstackModule, JsonPipeModule],
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

const Template: Story<GridstackComponent> = (props) => ({
    props,
    styles: [
        `.grid-stack-item-content {
    font-size: 10px;
  }`,
    ],
    template: `
    <div [gridstack]="gridstack" #gridStack (gridItemsChange)="gridItemsChange($event); items = $event;">
      <div gridstackItem [data]="item" *ngFor="let item of items; trackBy:gridStack.trackById ">
        <div class="grid-stack-item-content">Item <div>{{item | json}}</div>
      </div>
    </div>`,
});

export const Default = Template.bind({});
Object.assign(Default, cloneDeep(defOpts));

export const NoAminate = Template.bind({});
Object.assign(
    NoAminate,
    merge(cloneDeep(defOpts), {
        args: {
            gridstack: {
                animate: false,
            },
        },
    }),
);

const TemplateWithHandler: Story<GridstackComponent> = (props) => ({
    props,
    styles: [
        `.grid-stack-item-content {
    font-size: 10px;
  }
  .handler {
    width:20px;
    height: 20px;
    position:absolute;
    left: 0;
    background: green;
    top:0;
    z-index: 1;
    cursor: pointer;
  }`,
    ],
    template: `
    <div [gridstack]="gridstack" #gridStack (gridItemsChange)="gridItemsChange($event); items = $event;">
      <div gridstackItem [data]="item" *ngFor="let item of items; trackBy:gridStack.trackById ">
        <div class="grid-stack-item-content">
          <div class="handler"></div>
        Item <div>{{item | json}}</div>
      </div>
    </div>`,
});

export const CustomHandler = TemplateWithHandler.bind({});
Object.assign(
    CustomHandler,
    merge(cloneDeep(defOpts), {
        args: {
            gridstack: {
                handleClass: 'handler',
            },
        },
    }),
);

const TemplateContainer: Story<GridstackComponent> = (props) => ({
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
    template: `
    <div [gridstack]="gridstack" #gridStack (gridItemsChange)="gridItemsChange($event); items = $event;">
      <div gridstackItem [data]="item" *ngFor="let item of items; trackBy:gridStack.trackById ">
        <div class="grid-stack-item-content">
        Item <div>{{item | json}}</div>
      </div>
    </div>`,
});

export const CanvasContent = TemplateContainer.bind({});
Object.assign(
    CanvasContent,
    merge(cloneDeep(defOpts), {
        args: {
            gridstack: {
                handleClass: 'handler',
            },
        },
    }),
);

export const NoFloat = TemplateContainer.bind({});
Object.assign(
    NoFloat,
    merge(cloneDeep(defOpts), {
        args: {
            gridstack: {
                float: false,
            },
        },
    }),
);

export const StaticGrid = TemplateContainer.bind({});
Object.assign(
    StaticGrid,
    merge(cloneDeep(defOpts), {
        args: {
            gridstack: {
                staticGrid: true,
            },
        },
    }),
);

const TemplateEvents: Story<GridstackComponent> = (props) => ({
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
    args: {
        safeJson: (): string => {
            return 'test';
        },
    },

    template: `
    <div [gridstack]="gridstack" #gridStack
      (onAdded)="onAdded($event)"
      (onDisable)="onDisable($event)"
      (onDragstart)="onDragstart($event)"
      (onDragstop)="onDragstop(safeJson($event))"
      (onDropped)="onDropped($event)"
      (onResizestart)="onResizestart($event)"
      (onResizestop)="onResizestop($event)"
      (gridItemsChange)="gridItemsChange($event); items = $event;"
    >
      <div gridstackItem [data]="item" *ngFor="let item of items; trackBy:gridStack.trackById ">
        <div class="grid-stack-item-content">
        Item <div>{{item | safeJson}}</div>
      </div>
    </div>`,
});

export const Events = TemplateEvents.bind({});
Object.assign(Events, merge({}, cloneDeep(defOpts)));
