/**
 * Created by Mathias on 10/10/2016.
 */
const _ = require("lodash");

/**
 * Graph class
 */
class Graph{
    /**
     *
     * @param graph
     */
    constructor(graph = {}) {
        this.metadata = _.cloneDeep(graph.metadata);
        this.nodes = _.cloneDeep(graph.nodes);
        this.edges = _.cloneDeep(graph.edges);
    }

    addNode(node){
        this.nodes.push(node);
    }

    addEdge(edge){
        this.edges.push(edge);
    }
}

module.exports("Graph");
