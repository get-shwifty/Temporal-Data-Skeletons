var fs = require("fs");
var jsdom = require("jsdom");
var _ = require("lodash");
var moment = require("moment");


//EDIT HERE THE FILE TO PARSE
var fileName = "messages.htm";

var originFile = fs.readFileSync(fileName,"utf8").toString();

jsdom.env(
  originFile,
  ["http://code.jquery.com/jquery.js"],
  main
);

var $;

var graph; //CONTAINS THE FINAL JSON OBJECT

function main(err, window)
{
	$ = window.$;

	graph = { owner : null, edges : [] };

	graph.owner = $(".contents h1").text();

	graph.edges = [].concat.apply( [] , _.map($(".contents .thread"), parseThread ) );

	//WRITING TO A FILE IS NOT NEEDED IN BROWSER
	fs.writeFileSync(fileName+".json", JSON.stringify(graph));
}

function parseThread(thread)
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

function parseMessage(msg)
{
	var msgData = { 
		timestamp : toTimeStamp($(msg).text()),
		weight : $(msg).parents(".message").next().text().length }	
	return msgData;
}

function toTimeStamp( s )
{
	moment.locale('fr');

	var format = "dddd DD MMMM YYYY, HH:mm UTCZZ";

	var d = moment(s, format);

	return d.valueOf();
}