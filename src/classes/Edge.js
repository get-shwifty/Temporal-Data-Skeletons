const Node = require("./Node");
const _ = require("lodash");

/**
 * Edge class
 */
class Edge {
    constructor(s, t, options = {}) {
        if(!(s instanceof Node))
            throw new TypeError("Source parameter is not a Node");
        if(!(t instanceof Node))
            throw new TypeError("Target parameter is not a Node");

        _.defaultsDeep(options, {
            id: s.id + ";" + t.id,
            weight: 1
        });

        this.id = options.id;
        this.source = s;
        this.target = t;
        this.weight = options.weight;
    }
}
module.exports = Edge;
