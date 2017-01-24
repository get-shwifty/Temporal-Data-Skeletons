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

    static yearPOC(parsedData){
        const skeletonStrength = 0.5;

        let res = new Graph();
        res.metadata.type = Graph.TYPE.CircularSkelettonGraph;

        let currentDate = moment(0);
        let endDate = moment(currentDate).add(365, 'days');

        let timeFormats = {
            days:"D MMMM",
            months:"MM-YYYY",
            years:"YYYY",
        };

        //draw circleshape
        //(x0,y0) and whose radius is r is (x0 + r cos theta, y0 + r sin theta). Now choose theta values evenly spaced between 0 and 2pi.
        let incr = 6.29/365;
        let theta = 6.29*1.5;
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
            currentDate.add(1, 'days');
            let target = new Node(currentDate.valueOf(), {x: r*Math.cos(theta), y: r * Math.sin(theta), forceLabel: true, fixed: false, color: "#209ebe", label:currentDate.format( timeFormats[ 'days' ] ), labelColor: "node", size: 0.000001, mass: 1e-10, type: "skeleton"});
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

            let xSum = 0;
            let ySum = 0;
            let total = 0;
            _.forEach(messages, (msg) => {

                let msgTimestamp = moment(msg.timestamp).year(1970).valueOf();
                let index = interpolationSearch(skelTimestamps, msgTimestamp);
                if(index === -1) {
                    //console.log(moment(0).dayOfYear(moment(msg.timestamp).dayOfYear()).format("DD-MM-YYYY"));
                    var target = new Node(skelTimestamps[0]);
                    //var target = new Node(moment(0).dayOfYear(moment(msg.timestamp).dayOfYear()));
                }
                else {
                    var target = new Node(skelTimestamps[index]);
                }
                if( skelTimestamps[index] === undefined ) {
                    //console.log( msgTimestamp +" ----->"+moment(msg.timestamp).format( "DD-MM-YYYY"));
                }

                let n = skelNodes[index];
                if( n ){
                    xSum += n.x*msg.weight;
                    ySum += n.y*msg.weight;
                    total += msg.weight;
                }


                res.addEdge(new Edge(contactNode, target, {color: "rgba(0,0,0,0.05)", weight: Math.pow(msg.weight / maxWeight, 2) /10, mass: 1, type:'curve'}));
            });

            //compute node barycentre

            xSum /= total;
            ySum /= total;
            if( Number.isNaN(xSum) || Number.isNaN(ySum))
            {
                //console.log(contactID);
            }
            else {
                contactNode.setPosition(xSum,ySum);
            }

        });


        return res;
    }

    //TODO REFACTOR NEEDED, THIS IS JUST A QUICK HACK FOR THE POC
    static dayPOC(parsedData){

        const skeletonStrength = 0.5;

        let res = new Graph();
        res.metadata.type = Graph.TYPE.CircularSkelettonGraph;

        let currentDate = moment(0);
        let endDate = moment(currentDate).add(1, 'days').subtract(10,'minutes');

        let timeFormats = {
            days:"HH:mm",
            months:"MM-YYYY",
            years:"YYYY",
        };

        //draw circleshape
        //(x0,y0) and whose radius is r is (x0 + r cos theta, y0 + r sin theta). Now choose theta values evenly spaced between 0 and 2pi.
        let incr = 6.29/(24*6);
        let theta = 6.29*0.75;
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
            currentDate.add(10, 'minutes');
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

            let xSum = 0;
            let ySum = 0;
            let total = 0;
            _.forEach(messages, (msg) => {

                let msgTimestamp = moment(msg.timestamp).year(1970).dayOfYear(1).valueOf();
                let index = interpolationSearch(skelTimestamps, msgTimestamp);
                if(index === -1) {
                    //console.log(moment(0).dayOfYear(moment(msg.timestamp).dayOfYear()).format("DD-MM-YYYY"));
                    var target = new Node(skelTimestamps[0]);
                    //var target = new Node(moment(0).dayOfYear(moment(msg.timestamp).dayOfYear()));
                }
                else {
                    var target = new Node(skelTimestamps[index]);
                }
                if( skelTimestamps[index] === undefined ) {
                    //console.log( msgTimestamp +" ----->"+moment(msg.timestamp).format( "DD-MM-YYYY"));
                }

                let n = skelNodes[index];
                if( n ){
                   //console.log("ok");
                    xSum += n.x*msg.weight;
                    ySum += n.y*msg.weight;
                    total += msg.weight;
                }
                else {
                    //console.log("wrong");
                }


                res.addEdge(new Edge(contactNode, target, {color: "rgba(0,0,0,0.05)", weight: Math.pow(msg.weight / maxWeight, 2) /10, mass: 1, type:'curve'}));
            });

            //compute node barycentre

            xSum /= total;
            ySum /= total;
            if( Number.isNaN(xSum) || Number.isNaN(ySum))
            {
                //console.log(contactID);
            }
            else {
                contactNode.setPosition(xSum,ySum);
            }

        });


        return res;
    }

    //TODO REFACTOR NEEDED, THIS IS JUST A QUICK HACK FOR THE POC
    static weekPOC(parsedData){

        const skeletonStrength = 0.5;

        let res = new Graph();
        res.metadata.type = Graph.TYPE.CircularSkelettonGraph;

        let currentDate = moment(0);
        let endDate = moment(currentDate).add(7, 'days').subtract(1,'hours');

        let timeFormats = {
            days:"dd HH:mm",
            months:"MM-YYYY",
            years:"YYYY",
        };

        //draw circleshape
        //(x0,y0) and whose radius is r is (x0 + r cos theta, y0 + r sin theta). Now choose theta values evenly spaced between 0 and 2pi.
        let incr = 6.29/(24*7);
        let theta = 6.29*0.75;
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
            currentDate.add(1, 'hours');
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

            let xSum = 0;
            let ySum = 0;
            let total = 0;
            _.forEach(messages, (msg) => {

                let msgTimestamp = moment(msg.timestamp).year(1970).isoWeek(1).valueOf();
                let index = interpolationSearch(skelTimestamps, msgTimestamp);
                if(index === -1) {
                    //console.log(moment(0).dayOfYear(moment(msg.timestamp).dayOfYear()).format("DD-MM-YYYY"));
                    var target = new Node(skelTimestamps[0]);
                    //var target = new Node(moment(0).dayOfYear(moment(msg.timestamp).dayOfYear()));
                }
                else {
                    var target = new Node(skelTimestamps[index]);
                }
                if( skelTimestamps[index] === undefined ) {
                    //console.log( msgTimestamp +" ----->"+moment(msg.timestamp).format( "DD-MM-YYYY"));
                }

                let n = skelNodes[index];
                if( n ){
                    //console.log("ok");
                    xSum += n.x*msg.weight;
                    ySum += n.y*msg.weight;
                    total += msg.weight;
                }
                else {
                    //console.log("wrong");
                }


                res.addEdge(new Edge(contactNode, target, {color: "rgba(0,0,0,0.05)", weight: Math.pow(msg.weight / maxWeight, 2) /10, mass: 1, type:'curve'}));
            });

            //compute node barycentre

            xSum /= total;
            ySum /= total;
            if( Number.isNaN(xSum) || Number.isNaN(ySum))
            {
                //console.log(contactID);
            }
            else {
                contactNode.setPosition(xSum,ySum);
            }

        });


        return res;
    }



    static build(parsedData, granularity) {
        console.log(granularity);

        if (granularity.type === "days") {
            return this.dayPOC(parsedData);
        }
        else if (granularity.type === "years") {
            return this.yearPOC(parsedData);
        }
        else if( granularity.type ==="months"){
            return this.weekPOC(parsedData);
        }
    }
}

module.exports = CircularSkelettonBuilder;