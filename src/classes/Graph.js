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
        /**
         * metadata: {'type': , 'start':, 'end':}
         * @type {*}
         */
        (graph.metadata !== undefined ? this.metadata = _.cloneDeep(graph.metadata) : this.metadata = {});
        (graph.nodes !== undefined ? this.nodes = _.cloneDeep(graph.nodes) : this.nodes = {});
        (graph.edges !== undefined ? this.edges = _.cloneDeep(graph.edges) : this.edges = {});

    }

    addNode(node){
        if(this.nodes[node.id] === undefined)
            this.nodes[node.id] = node;
    }

    addNodes(tab){
        tab.forEach((node) => this.addNode(node));
    }

    addEdge(edge){
        //add target and source nodes if they don't exist
        if(this.nodes[edge.source.id] === undefined)
            this.nodes[edge.source.id] = edge.source;
        if(this.nodes[edge.target.id] === undefined)
            this.nodes[edge.target.id] = edge.target;
        if(this.edges[edge.id] === undefined)
            this.edges[edge.id] = edge;
        else
            this.edges[edge.id].weight++;
    }

    static TYPE = {
        'classicalGraph' : 'classicalGraph',
        'timeSkelettonGraph' :'timeSkelettonGraph',
        'amountSkelettonGraph' : 'amountSkelettonGraph'
    }
}

module.exports = Graph;
