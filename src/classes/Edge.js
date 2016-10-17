/**
 * Created by Felix Alié on 10/10/2016.
 */

/**
 * Edge class
 */
class Edge {
    constructor(s, t, id = s.id + ";" + t.id,w = 1) {
        this.id = id;
        this.source = s;
        this.target = t;
        this.weight = w;
    }
}
module.exports = Edge;
