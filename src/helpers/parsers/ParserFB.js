/**
 * Created by Felix Alié on 10/10/2016.
 */

const _ = require("lodash");
const  moment = require("moment");
const $ = require("jquery");

//helper permettant de parser un fichier message.html issu d'une archive facebook.

class ParserFB {

    //méthode main
    static parse(file) {
        var res = { owner : null, edges : [] };
        var $ = $.parseHtml(file);

        res.owner = $(".contents h1").text();
        res.edges = [].concat.apply( [] , _.map($(".contents .thread"), this.parseThread ) );

        return res;
    }

    //pour un message donné, récupère la date et génère le poids.
    static parseMessage(msg)
    {
        return {
            timestamp : toTimeStamp($(msg).text()),
            weight : $(msg).parents(".message").next().text().length

        };
    }

    //convertit une chaine de caractères en date de format donné
    static toTimeStamp( string )
    {
        moment.locale('fr');
        var format = "dddd DD MMMM YYYY, HH:mm UTCZZ";
        var date = moment(string, format);
        return date.valueOf();
    }

    //parse le fichier
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

ParserFB.init();

module.exports = ParserFB;