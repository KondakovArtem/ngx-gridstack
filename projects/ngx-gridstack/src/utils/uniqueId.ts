let uid = 0;

export function uniqueId(pfx = ''): string {
    return `${pfx}${uid++}`;
}
