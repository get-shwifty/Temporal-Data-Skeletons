/**
 * Created by Felix Alié and Damien Delmas on 10/10/2016.
 */

const _ = require("lodash");
const  moment = require("moment");
const $ = require("jQuery");


/**
 * Facebook File Parser
 */
class ParserFB {

    /**
     * main method
     * @param file
     * @returns {{owner: null, edges: Array}}
     */
    static parse(file) {
        var res = { owner : null, edges : [] };
        var $ = $.parseHtml(file);

        res.owner = $(".contents h1").text();
        res.edges = [].concat.apply( [] , _.map($(".contents .thread"), this.parseThread ) );

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
            timestamp : toTimeStamp($(msg).text()),
            weight : $(msg).parents(".message").next().text().length

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
     * matin parsing method
     * @param thread
     * @returns {Array}
     */
    static parseThread(thread)
    {
        var contacts = $(thread)
            .clone()    //clone the element
            .children() //select all the children
            .remove()   //remove all the children
            .end()  //again go back to selected element
            .text() // get the text
            .split(","); // split

        contacts = _.map(contacts, _.trim);

        var indexOfUser = contacts.indexOf(graph.owner);
        if(indexOfUser > -1)
        {
            contacts.splice(indexOfUser,1);
        }

        messages = _.map($(thread).find('.message .message_header .meta'), parseMessage);

        var links = [];

        _.each(messages, function(msg){
            for(var i=0; i < contacts.length; i++)
            {
                links.push({contact:contacts[i], timestamp: msg.timestamp, weight: msg.weight/contacts.length});
            }
        });

        return links;
    }
}

module.exports = ParserFB;