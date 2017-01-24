const _ = require("lodash");

/**
 * Node class
 */
class Node {
    constructor(id = "n" + Math.random() * Math.random() * 100, params = {size: 1}) {
        if( isNaN(id) && ! id instanceof String) debugger;
        this.id = id;
        this.label = id;
        this.x = Math.random();
        this.y = Math.random();
        _.assign(this, params);
    }

    setColor(string){
        this.color = string;
    }

    setPosition(x,y)
    {
        this.x = x;
        this.y = y;
    }
}


module.exports = Node;