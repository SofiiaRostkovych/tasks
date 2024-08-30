export function containsObject(obj: any, list: string | any[]) {
    var i: number;
    for (i = 0; i < list.length; i++) {
        if (list[i] === obj) {
            return true;
        }
    }

    return false;
}