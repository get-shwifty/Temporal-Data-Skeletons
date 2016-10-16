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
        var res = new Graph();
        res.metadata.type = Graph.TYPE.classicalGraph;

        var lines = file.split('\n');
        lines.forEach((line) => {
            var nodes  = line.split(',');
            console.log(nodes);
            if(nodes.length <= 6)
                throw Error("fichier csv invalide");

            var source = nodes[0];
            var target = nodes[4];
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


module.exports = ParserSMS;