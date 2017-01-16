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

    /**
     *
     * @param {Edge} edge
     */
    addEdge(edge){
        //add target and sourceNode nodes if they don't exist
        if(this.nodes[edge.sourceNode.id] === undefined)
            this.addNode(edge.sourceNode);
        if(this.nodes[edge.targetNode.id] === undefined)
            this.addNode(edge.targetNode);
        if(this.edges[edge.id] === undefined)
            this.edges[edge.id] = edge;
        else
            this.edges[edge.id].weight += edge.weight;
    }

    static TYPE = {
        'classicalGraph' : 'classicalGraph',
        'timeSkelettonGraph' :'timeSkelettonGraph',
        'amountSkelettonGraph' : 'amountSkelettonGraph',
        'circularSkelettonGraph' : 'circularSkelettonGraph'
    }
}

module.exports = Graph;
