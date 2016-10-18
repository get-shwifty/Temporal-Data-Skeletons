/**
 * Created by Felix Alié on 10/10/2016.
 */
const Node = require("./Node");
/**
 * Edge class
 */
class Edge {
    constructor(s, t, id = s.id + ";" + t.id,w = 1) {
        this.id = id;
        if(!(s instanceof Node))
            throw new TypeError("Source parameter is not a Node");
        else this.source = s;
        if(!(t instanceof Node))
            throw new TypeError("Target parameter is not a Node");
        this.weight = w;
    }
}
module.exports = Edge;
