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
        let parsedData = {
            contacts : {  },
            startDate:undefined,
            endDate:undefined
        };

        var doc = $.parseHTML(file);
        var contents = $(doc[4]);

        var owner = _.trim(contents.find("h1").text());

        // Get all edges in edgesMap
        _.each(contents.find(".thread"), (thread) => this.parseThread(owner, thread, parsedData));

        console.log(parsedData);
        return parsedData;
    }

    /**
     * main parsing method
     * @param owner
     * @param thread
     * @param {Object} edgesMap - New edges will be set in this object, the key is the edge id and the value is the edge
     * @returns {Array}
     */
    static parseThread(owner, thread, parsedData)
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

                if (parsedData.contacts[contact] === undefined) {
                    parsedData.contacts[contact] = [];
                }

                parsedData.contacts[contact].push({timestamp: msg.timestamp, weight: msg.weight/contacts.length});

                if (parsedData.startDate === undefined || msg.timestamp < parsedData.startDate) {
                    parsedData.startDate = msg.timestamp;
                }

                if (parsedData.endDate === undefined || msg.timestamp > parsedData.endDate) {
                    parsedData.endDate = msg.timestamp;
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