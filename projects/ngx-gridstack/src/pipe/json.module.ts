import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SafeJsonPipe } from './json.pipe';

@NgModule({
    declarations: [SafeJsonPipe],
    imports: [CommonModule],
    exports: [SafeJsonPipe],
})
export class JsonPipeModule {}
