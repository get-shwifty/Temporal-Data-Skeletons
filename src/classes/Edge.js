/**
 * Created by Felix Alié on 10/10/2016.
 */
const Node = require("./Node");
/**
 * Edge class
 */
class Edge {
    constructor(s, t, id = s.id + ";" + t.id,w = 1) {
        if(!(s instanceof Node))
            throw new TypeError("Source parameter is not a Node");
        if(!(t instanceof Node))
            throw new TypeError("Target parameter is not a Node");

        this.id = id;
        this.source = s;
        this.target = t;
        this.weight = w;
    }
}
module.exports = Edge;
