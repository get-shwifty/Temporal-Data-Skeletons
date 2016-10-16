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
        this.nodes.push(node);
    }

    addEdge(edge){
        this.edges.push(edge);
    }

    static TYPE = {
        'classicalGraph' : 'classicalGraph',
        'timeSkelettonGraph' :'timeSkelettonGraph',
        'amountSkelettonGraph' : 'amountSkelettonGraph'
    }
}

module.exports = Graph;
