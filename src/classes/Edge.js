/**
 * Created by Felix Alié on 10/10/2016.
 */

/**
 * Edge class
 */
class Edge {
    constructor(s, t, id = "e" + Math.random()*Math.random()*100) {
        this.id = id;
        edgeId++;
        this.source = s;
        this.target = t;
        this.weight = 1;
    }
}
module.exports("Edge");
