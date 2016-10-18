/**
 * Created by Felix Alié and Damien Delmas on 10/10/2016.
 */

const _ = require("lodash");
const  moment = require("moment");
const cheerio = require("cheerio");
const Graph = require("../../classes/Graph");
const Node = require("../../classes/Node");
const Edge = require("../../classes/Edge");
//const $ = require("jQuery");


/**
 * Facebook File Parser
 */
class ParserFB {

    /**
     *
     * @param file
     * @returns {Graph|exports|module.exports}
     */
    static parse(file) {
        //var res = { owner : null, edges : [] };
        var res = new Graph();
        res.metadata.type = Graph.TYPE.classicalGraph;

        var $ = cheerio.load(file);
        //var $ = $.parseHtml(file);
        var owner = $(".contents h1").text();
        //res.owner = $(".contents h1").text();
        var edges = [].concat.apply( [] , _.map($(".contents .thread"), this.parseThread ) );
        edges.forEach(edge => res.addEdge(edge));
        return res;
    }

    /**
     * parses a message to get associated date and weight
     * @param msg
     * @returns {{timestamp, weight: (*|jQuery)}}
     */
    static parseMessage(msg)
    {
        return {
            timestamp : toTimeStamp(cheerio(msg).text()),
            weight : cheerio(msg).parents(".message").next().text().length

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
        var format = "dddd DD MMMM YYYY, HH:mm UTCZZ";
        var date = moment(string, format);
        return date.valueOf();
    }

    /**
     * main parsing method
     * @param thread
     * @returns {Array}
     */
    static parseThread(thread)
    {
        var contacts = cheerio(thread)
            .clone()    //clone the element
            .children() //select all the children
            .remove()   //remove all the children
            .end()  //again go back to selected element
            .text() // get the text
            .split(","); // split

        contacts = _.map(contacts, _.trim);

        var indexOfUser = contacts.indexOf(owner);
        if(indexOfUser > -1)
        {
            contacts.splice(indexOfUser,1);
        }

        var messages = _.map(cheerio(thread).find('.message .message_header .meta'), parseMessage);

        var links = [];

        _.each(messages, function(msg){
            for(var i=0; i < contacts.length; i++)
            {
                var source = new Node(contacts[i]);
                var target = new Node(msg.timestamp);
                var link = new Edge(source,target,msg.weight/contacts.length);
                links.push(link);
                //links.push({contact:contacts[i], timestamp: msg.timestamp, weight: msg.weight/contacts.length});

            }
        });

        return links;
    }
}

module.exports = ParserFB;