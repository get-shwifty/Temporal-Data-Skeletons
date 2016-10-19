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
        var res = new Graph();
        res.metadata.type = Graph.TYPE.classicalGraph;

        var doc = $.parseHTML(file);
        var contents = $(doc[4]);

        var owner = _.trim(contents.find("h1").text());

        var edges = _.flatMap(contents.find(".thread"), (thread) => this.parseThread(owner, thread));
        edges.forEach(edge => res.addEdge(edge));
        return res;
    }

    /**
     * main parsing method
     * @param owner
     * @param thread
     * @returns {Array}
     */
    static parseThread(owner, thread)
    {
        var threadHtml = $(thread).html();
        var contacts =  _.map(threadHtml.slice(0, threadHtml.indexOf("<")).split(","), _.trim);

        var indexOfUser = contacts.indexOf(owner);
        if(indexOfUser > -1)
        {
            contacts.splice(indexOfUser,1);
        }

        var messages = _.map($(thread).find('.message .message_header .meta'), (msg) => this.parseMessage(msg));

        return _.flatMap(messages, (msg) => {
            return _.map(contacts, (contact) => {
                var source = new Node(contact);
                var target = new Node(msg.timestamp);
                return new Edge(source, target, undefined, msg.weight/contacts.length);
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
        let date = moment(string, format);
        return date.valueOf();
    }
}

module.exports = ParserFB;