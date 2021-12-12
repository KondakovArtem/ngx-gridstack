import { Pipe, PipeTransform } from '@angular/core';
import safeJsonStringify from 'safe-json-stringify';

/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | exponentialStrength:exponent
 * Example:
 *   {{ 2 | exponentialStrength:10 }}
 *   formats to: 1024
 */
@Pipe({ name: 'safeJson' })
export class SafeJsonPipe implements PipeTransform {
    transform(value: any): string {
        return safeJsonStringify(value);
    }
}
