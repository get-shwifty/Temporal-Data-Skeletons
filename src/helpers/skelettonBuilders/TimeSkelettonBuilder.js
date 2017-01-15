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
        const skeletonStrenght = 0.5;

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
            let source = new Node(currentDate.format( timeFormats[ granularity.type ] ), {color: "#0F056B", labelColor: "node", size: 2, mass: 1e-10});
            currentDate.add(granularity.increment, granularity.type);
            let target = new Node(currentDate.format( timeFormats[ granularity.type ] ), {color: "#0F056B", labelColor: "node", size: 2, mass: 1e-10});
            res.addEdge(new Edge(source, target, {weight: skeletonStrenght, color: "#0F056B", size: 10}));
        }

        let maxContactWeight = _.max(_.map(parsedData.contacts, msgs => _.sumBy(msgs, "weight")));
        //link the contacts to the skeletton according to the messages
        _.forEach(parsedData.contacts,( messages, contactID ) => {
            let contactNode = new Node(contactID, {color: "#C40233", labelColor: "node", size: Math.sqrt((_.sumBy(messages, "weight")) / maxContactWeight) * 50 + 20 });
            let maxWeight = _.maxBy(messages, "weight").weight;
            _.forEach(messages, (msg) => {
                let msgTimestamp = msg.timestamp;
                let startDateTimestamp = parsedData.startDate;
                let interval = moment.duration(granularity.increment, granularity.type).asMilliseconds();

                let gapWithPreviousDay = ( msgTimestamp  - startDateTimestamp)%interval;
                let closestTime = moment( msgTimestamp - gapWithPreviousDay ).format ( timeFormats[ granularity.type ] );

                let target = new Node(closestTime);
                res.addEdge(new Edge(contactNode, target, {color: "rgba(0,0,0,80)", weight: Math.pow(msg.weight / maxWeight, 2) /10, mass: 1}));
            });
        });

        return res;
    }


}


module.exports = TimeSkelettonBuilder;

