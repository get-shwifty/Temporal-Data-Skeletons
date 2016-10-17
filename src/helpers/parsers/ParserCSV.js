/**
 * Created by Felix Alié on 10/10/2016.
 */

const _ = require("lodash");
const Graph = require("../../classes/Graph");
const Node = require("../../classes/Node");
const Edge = require("../../classes/Edge");
/**
 * Default CSV Parser, the csv must be ';' separated and have only source and target collumns
 */
class ParserCSV {

    /**
     * main parsing method
     * @param file
     * @returns Graph
     */
    static parse(file) {
        var res = new Graph();
        res.metadata.type = Graph.TYPE.classicalGraph;

        var lines = file.split('\n');
        lines.forEach((line) => {
            var nodes  = line.split(';');
            if(nodes.length !== 2)
                throw Error("fichier csv invalide");

            var source = new Node(nodes[0]);
            var target = new Node(nodes[1]);
            res.addNodes([source,target]);
            var edge = new Edge(source, target);
            res.addEdge(edge);
        });
        return res;
    }
}


module.exports = ParserCSV;