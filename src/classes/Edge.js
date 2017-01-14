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
        this.sourceNode = s;
        this.targetNode = t;
        this.source = s.id;
        this.target = t.id;
        this.weight = options.weight;
    }
}
module.exports = Edge;
