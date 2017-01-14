/**
 * Created by Felix Alié on 10/10/2016.
 */

const _ = require("lodash");
const Graph = require("../../classes/Graph");
const Node = require("../../classes/Node");
const Edge = require("../../classes/Edge");
/**
 * Default CSV Parser, the csv must be ';' separated and have only sourceNode and target collumns
 */
class ParserCSV {

    /**
     * main parsing method
     * @param file
     * @returns Graph
     */
    static parse(file) {
        let res = new Graph();
        res.metadata.type = Graph.TYPE.classicalGraph;

        let lines = file.split('\n');
        lines.forEach((line) => {
            let nodes  = line.split(';');
            if(nodes.length !== 2)
                throw Error("fichier csv invalide");

            let source = new Node(nodes[0]);
            let target = new Node(nodes[1]);
            //res.addNodes([sourceNode,target]);
            let edge = new Edge(source, target);
            res.addEdge(edge);
        });
        return res;
    }
}


module.exports = ParserCSV;