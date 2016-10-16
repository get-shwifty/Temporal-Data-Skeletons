/**
 * Created by Félix Alié on 10/10/2016.
 */

/**
 * Node class
 */

class Node {
    constructor(id = "n" + Math.random()*Math.random()*100) {
        this.id = id;
        /*this.x = Math.random();
        this.y = Math.random();*/
        this.size = 1;
    }
}


module.exports = Node;