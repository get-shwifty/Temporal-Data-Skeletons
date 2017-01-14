/**
 * Created by Felix Alié on 10/10/2016.
 */

const _ = require("lodash");
const moment = require("moment");
const Graph = require("../../classes/Graph");
const Node = require("../../classes/Node");
const Edge = require("../../classes/Edge");

/**
 * Time Skeletton Builder
 */
class TimeSkelettonBuilder {
    /**
     *
     * @param graph
     * @param granularity
     * @returns {Graph}
     */
    static build(graph, granularity = {type:"days", increment:1}){
        let res = new Graph(graph);
        res.metadata.type = Graph.TYPE.timeSkelettonGraph;
        let currentDate = this.toTimeStamp(graph.metadata.start);

        while(currentDate <= this.toTimeStamp(graph.metadata.end)){
            let source = new Node(currentDate.valueOf());
            currentDate.add(granularity.increment, granularity.type);
            let target = new Node(currentDate.valueOf());
            res.addEdge(new Edge(source, target));
        }
        return res;
    }

    static toTimeStamp( string )
    {
        moment.locale('fr');
        let format = "dddd DD MMMM YYYY, HH:mm UTCZZ";
        return moment(string, format);
    }

}


module.exports = TimeSkelettonBuilder;

