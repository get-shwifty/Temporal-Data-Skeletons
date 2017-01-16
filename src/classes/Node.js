const _ = require("lodash");

/**
 * Node class
 */
class Node {
    constructor(id = "n" + Math.random() * Math.random() * 100, params = {size: 1}) {
        this.id = id;
        this.label = id;
        this.x = 0;//Math.random();
        this.y = 0;//Math.random();
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