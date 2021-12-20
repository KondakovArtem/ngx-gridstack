import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { GridStackItemDirective } from './gridstack-item.directive';
import { GridStackDirective } from './gridstack.directive';

@NgModule({
    declarations: [GridStackItemDirective, GridStackDirective],
    imports: [CommonModule],
    exports: [GridStackItemDirective, GridStackDirective],
})
export class GridStackModule {}
