![npm](https://img.shields.io/npm/v/@kondakov.artem/ngx-gridstack) ![NPM](https://img.shields.io/npm/l/@kondakov.artem/ngx-gridstack)

# NgxGridStack

Angular Wrapper library for [GridStack](https://gridstackjs.com/).

## Development server

Run `yarn storybook` for a dev server.

[**Live Demo**](https://www.chromatic.com/component?buildNumber=1&historyLengthAtIndex=18&distanceToMoveBack=-10&appId=61c0f70a579bcd003a67f38e&name=GridStack&specName=Default&componentInspectorKey=61c0f825579bcd003a680df9-1200-interactive-true&inviteToken=e865a04c2c2742169ab6c6b66ed1f8e5)

## Installation

```sh
yarn add gridstack
yarn add @kondakov.artem/ngx-gridstack
```

## Usage

```typescript
import { GridStackModule } from '@kondakov.artem/ngx-gridstack';

...

@NgModule({
    declarations: [],
    imports: [
      ...
      GridStackModule
    ],
    providers: [],
})
export class AppModule {}

```

Add directives to the template

```html
...
<div
    [gridStack]="gridStackOptions"
    #gridStack="gridStack"
    (gridItemsChange)="gridItemsChange($event); items = $event;"
>
    <div gridStackItem [data]="item" *ngFor="let item of items; trackBy:gridStack.trackById ">
        <div class="grid-stack-item-content">
            Item
            <div>{{item | json}}</div>
        </div>
    </div>
</div>
```

Add in your Component

```typescript
...

  public items = [
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
  ];
  
  public gridStackOptions: GridStackOptions = {
    margin: 10,
    disableDrag: false,
    disableResize: false,
    auto: true,
    float: true,
    animate: true,
  };
...
```

## Styling

Add scss style in your project

```scss
@import '~@kondakov.artem/ngx-gridstack/styles/gridstack';
```

## Styling customization

There are several scss variables that can be overridden

```scss
$gridstack-resizer-size: 10px !default;
$gridstack-resizer-offset: 0 !default;
$gridstack-item-shadow: 0 0 14px 1px #9188885a !default;
$gridstack-item-background: white !default;
$gridstack-item-action-opacity: 0.8 !default;
$gridstack-item-action-shadow: 1px 4px 6px rgba(0, 0, 0, 20%) !default;
$gridstack-item-action-background: aliceblue !default;
$gridstack-item-resizer-image: ... !default;

$gridstack-columns: 12 !default;
$gridstack-animation-speed: 0.3s !default;
```
