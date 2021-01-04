let serialize = function (input) {
    const escape_sequences = { "\\\\": "\\\\", "`": "\\`", "\\\\b": "\\\\b", '"': '\\"', "\\n": "\\n", "\\\\f": "\\\\f", "\\r": "\\r", "\\\\t": "\\\\\\t", "\\\\v": "\\\\v" };
    if (typeof input === "string") {
        let result = input;
        for (var key in escape_sequences) {
            result = result.replace(new RegExp(key, "g"), escape_sequences[key]);
        }
        return '`' + result + '`';
    } else if (typeof input === "number") {
        return input.toString();
    } else if (typeof input === "function") {
        // Handle build in functions
        if ((/\{\s*\[native code\]\s*\}/).test('' + input)) return input.name;
        return input.toString().replace(/"/g, '\"');
    } else if (typeof input === "symbol") {
        return input.toString();
    } else if (input === null || input === undefined) {
        return input;
    } else if (input instanceof Array) {
        let res_list = [];
        for (let i = 0; i < input.length; i++) {
            res_list.push(serialize(input[i]));
        }
        return "[" + res_list.join(",") + "]";
    } else if (input.constructor == Object) {
        let res_list = [];
        for (let key in input) {
            res_list.push('"' + key.replace(/"/g, '\\"') + '":' + serialize(input[key]));
        }
        return "{" + res_list.join(",") + "}";
    } else if (typeof input === "object") {
        throw (`You are trying to serialize an instance of ` + input.constructor.name + `, we don't serialize class instances for a bunch of reasons.`)
    } else {
        return input;
    }
}

let unserialize = function (input) {
    return Function(`
        "use strict";
        return `+ input + `;`
    )();
}
export const loadState = () => {
    try {
        const serializedState = localStorage.getItem('state');
        if (serializedState === null) {
            return undefined;
        }
        return unserialize(serializedState);
    } catch (err) {
        return undefined;
    }
};

export const saveState = (state) => {
    try {
        const serializedState = serialize(state);
        localStorage.setItem('state', serializedState);
    } catch (err) {
        // Ignore write errors.
    }
};
