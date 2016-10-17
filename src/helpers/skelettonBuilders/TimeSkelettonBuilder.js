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
     * @param grannularity
     * @returns {Graph}
     */
    static build(graph, granularity = {type:"days", increment:1}){
        var res = new Graph(graph);
        res.metadata.type = Graph.TYPE.timeSkelettonGraph;
        var currentDate = this.toTimeStamp(graph.metadata.start);

        while(currentDate <= this.toTimeStamp(graph.metadata.end)){
            var source = new Node(currentDate.valueOf());
            currentDate.add(granularity.increment, granularity.type);
            var target = new Node(currentDate.valueOf());
            res.addEdge(source,target);
        }
        return res;
    }

    static toTimeStamp( string )
    {
        moment.locale('fr');
        var format = "dddd DD MMMM YYYY, HH:mm UTCZZ";
        var date = moment(string, format);
        return date;
    }

}


module.exports = TimeSkelettonBuilder;

