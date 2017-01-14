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
     * @param parsedData
     * @param granularity
     * @returns {Graph}
     */
    static build(parsedData, granularity = {type:"days", increment:1}){

        const skeletonStrenght = 500;

        let res = new Graph();
        res.metadata.type = Graph.TYPE.timeSkelettonGraph;

        let currentDate = moment(parsedData.startDate);

        //create skelleton nodes
        while(currentDate <= parsedData.endDate){
            let source = new Node(currentDate.format("DD-MM-YYYY"));
            currentDate.add(granularity.increment, granularity.type);
            let target = new Node(currentDate.format("DD-MM-YYYY"));
            res.addEdge(new Edge(source, target,{weight: skeletonStrenght}));
        }

        //link the contacts to the skeletton according to the messages
        _.forEach(parsedData.contacts,( messages, contactID ) => {

            let contactNode = new Node(contactID, _.sumBy(messages,"weight"));
            console.log(contactNode);

            _.forEach(messages, (msg) => {
                let target = new Node(moment(msg.timestamp).format("DD-MM-YYYY"));
                res.addEdge(new Edge(contactNode, target, {weight:msg.weight}));
            });

        });

        return res;
    }


}


module.exports = TimeSkelettonBuilder;

