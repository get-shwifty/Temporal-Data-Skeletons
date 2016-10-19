/**
 * Created by Felix Alié and Damien Delmas on 10/10/2016.
 */

const _ = require("lodash");

const moment = require("moment");
require("moment/locale/fr");
const $ = require("jquery");

const Graph = require("../../classes/Graph");
const Node = require("../../classes/Node");
const Edge = require("../../classes/Edge");

/**
 * Facebook File Parser
 */
class ParserFB {

    /**
     *
     * @param file
     * @returns {Graph}
     */
    static parse(file) {
        var graph = new Graph();
        graph.metadata.type = Graph.TYPE.classicalGraph;

        var doc = $.parseHTML(file);
        var contents = $(doc[4]);

        var owner = _.trim(contents.find("h1").text());

        // Get all edges in edgesMap
        let edgesMap = {};
        _.each(contents.find(".thread"), (thread) => this.parseThread(owner, thread, edgesMap));

        // Add all edges to the graph
        _.each(_.values(edgesMap), (edge) => graph.addEdge(edge));

        return graph;
    }

    /**
     * main parsing method
     * @param owner
     * @param thread
     * @param {Object} edgesMap - New edges will be set in this object, the key is the edge id and the value is the edge
     * @returns {Array}
     */
    static parseThread(owner, thread, edgesMap)
    {
        let threadHtml = $(thread).html();
        let contacts =  _.map(threadHtml.slice(0, threadHtml.indexOf("<")).split(","), _.trim);

        let indexOfUser = contacts.indexOf(owner);
        if(indexOfUser > -1)
        {
            contacts.splice(indexOfUser,1);
        }

        let messages = _.map($(thread).find('.message .message_header .meta'), (msg) => this.parseMessage(msg));

        _.each(messages, (msg) => {
            _.each(contacts, (contact) => {
                let source = new Node(contact);
                let target = new Node(msg.timestamp);
                let edge = new Edge(source, target, {weight: msg.weight/contacts.length });
                if(edgesMap[edge.id]) {
                    edgesMap[edge.id].weight += edge.weight;
                } else {
                    edgesMap[edge.id] = edge;
                }
            });
        });
    }

    /**
     * parses a message to get associated date and weight
     * @param msg
     * @returns {{timestamp, weight: (*|jQuery)}}
     */
    static parseMessage(msg)
    {
        let $msg = $(msg);
        return {
            timestamp: this.toTimeStamp($msg.text()),
            weight: $msg.parents(".message").next().text().length
        };
    }

    /**
     * converts a string in a js date
     * @param string
     * @returns {*|Array|boolean|Number|string|XMLList}
     */
    static toTimeStamp( string )
    {
        moment.locale('fr');
        let format = "dddd DD MMMM YYYY, HH:mm UTCZZ";
        let date = moment(string, format).hours(0).minutes(0).seconds(0);
        return date.valueOf();
    }
}

module.exports = ParserFB;