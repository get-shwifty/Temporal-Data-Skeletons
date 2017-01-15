const _ = require("lodash");

/**
 * Node class
 */
class Node {
    constructor(id = "n" + Math.random() * Math.random() * 100, params = {size: 1}) {
        this.id = id;
        this.label = id;
        this.x = Math.random();
        this.y = Math.random();
        _.assign(this, params);
    }

    setColor(string){
        this.color = string;
    }
}


module.exports = Node;