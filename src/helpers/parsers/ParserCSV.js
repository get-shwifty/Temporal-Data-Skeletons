/**
 * Created by Felix Alié on 10/10/2016.
 */

const _ = require("lodash");
require("../../classes/Graph");
require("../../classes/Node");
require("../../classes/Edge");
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

            var source = nodes[0];
            var target = nodes[1];
            //creates the source node if not existing yet
            if(res.nodes[source] === undefined){
                res.nodes[source] = new Node(source);
            }
            //creates the target node if not existing yet
            if(res.nodes[target] === undefined){
                res.nodes[target] = new Node(target);
            }
            //creates the edge if not existing yet
            if(res.edges[source+";"+target] === undefined) {
                res.edges[source+";"+target] = new Edge(source, target, source + ";" + target);
            }
            //increases the weight if already existing
            else{
                res.edges[source+";"+target].weight++;
            }
        });
        return res;
    }
}

ParserCSV.init();

module.exports = ParserCSV;