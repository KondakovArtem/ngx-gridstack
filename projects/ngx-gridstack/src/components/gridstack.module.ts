import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { GridstackItemComponent } from './gridstack-item.component';
import { GridstackComponent } from './gridstack.component';

@NgModule({
    declarations: [GridstackComponent, GridstackItemComponent],
    imports: [CommonModule],
    exports: [GridstackComponent, GridstackItemComponent],
})
export class NgGridstackModule {}
