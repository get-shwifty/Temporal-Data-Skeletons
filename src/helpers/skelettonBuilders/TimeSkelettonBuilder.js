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
    static build(parsedData, granularity){
        granularity.increment = _.toNumber(granularity.increment);
        const skeletonStrength = 0.5;

        let res = new Graph();
        res.metadata.type = Graph.TYPE.timeSkelettonGraph;

        let currentDate = moment(parsedData.startDate);

        let timeFormats = {
            days:"DD-MM-YYYY",
            months:"MM-YYYY",
            years:"YYYY"
        };

        //create skelleton nodes
        while(currentDate <= parsedData.endDate){

            let source = new Node(currentDate.valueOf(),{label:currentDate.format( timeFormats[ granularity.type ] ), color: "#209ebe", labelColor: "node", size: 2, mass: 1e-10, type: "skeleton"});
            currentDate.add(granularity.increment, granularity.type);
            let target = new Node(currentDate.valueOf(),{label:currentDate.format( timeFormats[ granularity.type ] ), color: "#209ebe", labelColor: "node", size: 2, mass: 1e-10, type: "skeleton"});
            res.addEdge(new Edge(source, target, {weight: skeletonStrength, color: "#209ebe", size: 10}));
        }

        let maxContactWeight = _.max(_.map(parsedData.contacts, msgs => _.sumBy(msgs, "weight")));
        //link the contacts to the skeleton according to the messages
        _.forEach(parsedData.contacts,( messages, contactID ) => {
            let contactNode = new Node(contactID, {color: "#d54209", labelColor: "node", size: Math.sqrt((_.sumBy(messages, "weight")) / maxContactWeight) * 33 + 2});
            let maxWeight = _.maxBy(messages, "weight").weight;
            _.forEach(messages, (msg) => {
                let msgTimestamp = msg.timestamp;
                let startDateTimestamp = parsedData.startDate;
                let interval = moment.duration(granularity.increment, granularity.type).asMilliseconds();

                let gapWithPreviousDay = ( msgTimestamp  - startDateTimestamp)%interval;
                let closestTimestamp = moment( msgTimestamp - gapWithPreviousDay );

                let target = new Node(closestTimestamp.valueOf() , {label:closestTimestamp.format( timeFormats[ granularity.type ] )});
                res.addEdge(new Edge(contactNode, target, {color: "rgba(0,0,0,0.05)", weight: Math.pow(msg.weight / maxWeight, 2) /10, mass: 1, type:'curve'}));
            });
        });

        return res;
    }


}


module.exports = TimeSkelettonBuilder;

