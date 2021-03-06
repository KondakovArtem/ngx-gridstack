import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { GridStackOptions } from 'gridstack';
import cloneDeep from 'lodash/cloneDeep';
import merge from 'lodash/merge';

import { GridStackDirective } from './gridstack.directive';
import { GridStackModule } from './gridstack.module';
import { JsonPipeModule } from '../pipe/json.module';

export default {
    title: 'GridStack',
    component: GridStackDirective,
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
        gridStackOptions: {
            margin: 10,
            disableDrag: false,
            disableResize: false,
            auto: true,
            float: true,
            animate: true,
        } as GridStackOptions,
    },
};

const Template: Story<GridStackDirective> = (props) => ({
    props,
    styles: [
        `.grid-stack-item-content {
    font-size: 10px;
  }`,
    ],
    template: `
    <div [gridStack]="gridStackOptions" #gridStack="gridStack" (gridItemsChange)="gridItemsChange($event); items = $event;">
      <div gridStackItem [data]="item" *ngFor="let item of items; trackBy:gridStack.trackById ">
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
            gridStackOptions: {
                animate: false,
            },
        },
    }),
);

const TemplateWithHandler: Story<GridStackDirective> = (props) => ({
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
    <div [gridStack]="gridStackOptions" #gridStack="gridStack" (gridItemsChange)="gridItemsChange($event); items = $event;">
      <div gridStackItem [data]="item" *ngFor="let item of items; trackBy:gridStack.trackById ">
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
            gridStackOptions: {
                handleClass: 'handler',
            },
        },
    }),
);

const TemplateContainer: Story<GridStackDirective> = (props) => ({
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
    <div [gridStack]="gridStackOptions" #gridStack="gridStack" (gridItemsChange)="gridItemsChange($event); items = $event;">
      <div gridStackItem [data]="item" *ngFor="let item of items; trackBy:gridStack.trackById ">
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
            gridStackOptions: {
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
            gridStackOptions: {
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
            gridStackOptions: {
                staticGrid: true,
            },
        },
    }),
);
