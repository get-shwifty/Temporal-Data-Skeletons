/**
 * Created by Felix Alié on 10/10/2016.
 */

const _ = require("lodash");
const Graph = require("../../classes/Graph");
const Node = require("../../classes/Node");
const Edge = require("../../classes/Edge");

/**
 * SMS File Parser
 */
class ParserSMS {

    /**
     * main parsing method
     * @param file
     * @returns {{}}
     */
    static parse(file) {
        let res = new Graph();
        res.metadata.type = Graph.TYPE.classicalGraph;

        let lines = file.split('\n');
        lines.forEach((line) => {
            let nodes  = line.split(',');
            console.log(nodes);
            if(nodes.length <= 6)
                throw Error("fichier csv invalide");

            let source = new Node(nodes[0]);
            let target = new Node(nodes[4]);
            res.addNodes([source,target]);
            let edge = new Edge(source, target);
            res.addEdge(edge);
        });
        return res;
    }
}


module.exports = ParserSMS;