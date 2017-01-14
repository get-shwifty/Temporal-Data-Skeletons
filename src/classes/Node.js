/**
 * Created by Félix Alié on 10/10/2016.
 */

/**
 * Node class
 */

class Node {
    constructor(id = "n" + Math.random()*Math.random()*100, size = 1) {
        this.id = id;
        this.label = id;
        this.x = Math.random();
        this.y = Math.random();
        this.size = size;
    }

    setColor(string){
        this.color = string;
    }
}


module.exports = Node;