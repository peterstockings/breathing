export const uuid = () => {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}

export const getLast = (arr = null, n = null) => { if (arr == null) return void 0; if (n === null) return arr[arr.length - 1]; return arr.slice(Math.max(arr.length - n, 0)); };

export const getCurrentPosition = (states) => {
    let mappings = {
        'In': 1,
        'Hold': 0,
        'Out': -1,
    }
    return states.reduce((a, c) => a + mappings[c.name], 0)
}