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

        granularity.increment = _.toNumber(granularity.increment);

        const skeletonStrenght = 500;

        let res = new Graph();
        res.metadata.type = Graph.TYPE.timeSkelettonGraph;

        let currentDate = moment(parsedData.startDate);

        let timeFormats = {
            days:"DD-MM-YYYY",
            months:"MM-YYYY",
            years:"YYYY"
        }

        //create skelleton nodes
        while(currentDate <= parsedData.endDate){
            let source = new Node( currentDate.format( timeFormats[ granularity.type ] ) );
            currentDate.add( granularity.increment, granularity.type );
            let target = new Node( currentDate.format( timeFormats[ granularity.type ] ) );


            let skeletonColor = "red";

            source.setColor( skeletonColor );
            target.setColor( skeletonColor );

            let edge =  new Edge( source, target, { weight: skeletonStrenght } );
            edge.setColor( skeletonColor );
            res.addEdge( edge );
        }

        //link the contacts to the skeletton according to the messages
        _.forEach(parsedData.contacts,( messages, contactID ) => {

            let contactNode = new Node(contactID, _.sumBy(messages,"weight"));

            _.forEach(messages, (msg) => {

                let msgTimestamp = msg.timestamp;
                let startDateTimestamp = parsedData.startDate;
                let interval = moment.duration(granularity.increment, granularity.type).asMilliseconds();

                let gapWithPreviousDay = ( msgTimestamp  - startDateTimestamp)%interval;

                let closestTime = moment( msgTimestamp - gapWithPreviousDay ).format ( timeFormats[ granularity.type ] );

                let target = new Node( closestTime );

                res.addEdge(new Edge(contactNode, target, {weight:msg.weight}));
            });

        });

        return res;
    }


}


module.exports = TimeSkelettonBuilder;

