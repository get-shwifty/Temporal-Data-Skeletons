/**
 * Created by Damien on 16/01/2017.
 */

const _ = require("lodash");
const moment = require("moment");

const interpolationSearch = require('../../../interpolationSearch');

const Graph = require("../../classes/Graph");
const Node = require("../../classes/Node");
const Edge = require("../../classes/Edge");

class CircularSkelettonBuilder{
    static build(parsedData, granularity){

        const skeletonStrength = 0.5;

        let res = new Graph();
        res.metadata.type = Graph.TYPE.CircularSkelettonGraph;

        let currentDate = moment(0);
        let endDate = moment(currentDate).add(364, 'days');

        console.log(currentDate);
        console.log(endDate);
        let timeFormats = {
            days:"DD-MM-YYYY",
            months:"MM-YYYY",
            years:"YYYY",
        };

        //draw circleshape
        //(x0,y0) and whose radius is r is (x0 + r cos theta, y0 + r sin theta). Now choose theta values evenly spaced between 0 and 2pi.
        let incr = 6.29/366;
        let theta = 0;
        let r = 25;

        let skelTimestamps = [];
        let skelNodes = [];


        //first skeletton node
        let firstNode = new Node(currentDate.valueOf(), {x: r* Math.cos(theta), y: r * Math.sin(theta), color: "#209ebe", label: currentDate.format( timeFormats[ 'days' ] ), labelColor: "node", size: 2, mass: 1e-10, type: "skeleton"}) ;
        let prevNode = firstNode;
        skelTimestamps.push(firstNode.id);
        skelNodes.push(firstNode);

        //create skelleton nodes
        while(currentDate < endDate){
            theta += incr;
            console.log(currentDate);
            currentDate.add(1, 'days');
            let target = new Node(currentDate.valueOf(), {x: r*Math.cos(theta), y: r * Math.sin(theta), fixed: false, color: "#209ebe", label:currentDate.format( timeFormats[ 'days' ] ), labelColor: "node", size: 0.000001, mass: 1e-10, type: "skeleton"});
            res.addEdge(new Edge(prevNode, target, {weight: skeletonStrength, color: "#209ebe", size: 10}));
            skelTimestamps.push(target.id);
            skelNodes.push(target);
            prevNode = target;
        }
        res.addEdge(new Edge(prevNode, firstNode, {weight: skeletonStrength, color: "#209ebe", size: 10}));

        let maxContactWeight = _.max(_.map(parsedData.contacts, msgs => _.sumBy(msgs, "weight")));
        //link the contacts to the skeleton according to the messages
        _.forEach(parsedData.contacts,( messages, contactID ) => {
            let contactNode = new Node(contactID, {color: "#d54209", labelColor: "node", size: Math.sqrt((_.sumBy(messages, "weight")) / maxContactWeight) * 33 + 2});
            let maxWeight = _.maxBy(messages, "weight").weight;
            let relatedNodes = [];
            _.forEach(messages, (msg) => {

                let msgTimestamp = moment(msg.timestamp).year(1970).valueOf();
                let index = interpolationSearch(skelTimestamps, msgTimestamp);
                let target = new Node(skelTimestamps[index]);

                relatedNodes.push(skelNodes[index]);

                res.addEdge(new Edge(contactNode, target, {color: "rgba(0,0,0,0.05)", weight: Math.pow(msg.weight / maxWeight, 2) /10, mass: 1, type:'curve'}));
            });
            console.log(contactID);
            console.log(relatedNodes);
            //compute node barycentre
            let xSum = 0;
            let ySum = 0;
            _.forEach(relatedNodes, (n) => {
                if( !n ) return;
                xSum += n.x;
                ySum += n.y;
            });
            xSum /= relatedNodes.length;
            ySum /= relatedNodes.length;
            contactNode.setPosition(xSum,ySum);
        });

        /*let skelTimestamps = [];

        //first skeletton node
        let firstNode = new Node(currentDate.valueOf(), {color: "#209ebe", label: currentDate.format( timeFormats[ granularity.type ] ), labelColor: "node", size: 2, mass: 1e-10, type: "skeleton"}) ;
        skelTimestamps.push(firstNode.id);
        let prevNode = firstNode;

        //create skelleton nodes
        while(currentDate <= endDate){
            currentDate.add(granularity.increment, granularity.type);
            let target = new Node(currentDate.valueOf(), {color: "#209ebe", label:currentDate.format( timeFormats[ granularity.type ] ), labelColor: "node", size: 0.000001, mass: 1e-10, type: "skeleton"});
            res.addEdge(new Edge(prevNode, target, {weight: skeletonStrength, color: "#209ebe", size: 10}));
            skelTimestamps.push(target.id);
            prevNode = target;
        }
        res.addEdge(new Edge(prevNode, firstNode, {weight: skeletonStrength, color: "#209ebe", size: 10}));


        /*let maxContactWeight = _.max(_.map(parsedData.contacts, msgs => _.sumBy(msgs, "weight")));
        //link the contacts to the skeleton according to the messages
        _.forEach(parsedData.contacts,( messages, contactID ) => {
            let contactNode = new Node(contactID, {color: "#d54209", labelColor: "node", size: Math.sqrt((_.sumBy(messages, "weight")) / maxContactWeight) * 33 + 2});
            let maxWeight = _.maxBy(messages, "weight").weight;
            _.forEach(messages, (msg) => {

                let msgTimestamp = msg.timestamp;

                let index = interpolationSearch(skelTimestamps, msgTimestamp);

                let target = new Node(skelTimestamps[index]);

                res.addEdge(new Edge(contactNode, target, {color: "rgba(0,0,0,0.05)", weight: Math.pow(msg.weight / maxWeight, 2) /10, mass: 1, type:'curve'}));
            });
        });*/
        return res;
    }
}

module.exports = CircularSkelettonBuilder;