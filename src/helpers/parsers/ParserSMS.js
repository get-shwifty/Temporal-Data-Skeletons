/**
 * Created by Felix Alié on 10/10/2016.
 */

const Graph = require("../../classes/Graph");
const Node = require("../../classes/Node");
const Edge = require("../../classes/Edge");

const moment = require("moment");
require("moment/locale/fr");
const _ = require("lodash");


/**
 * SMS File Parser
 */
class ParserSMS {

    /**
     * main parsing method
     * @param file
     * @returns {{}}
     */
    static parse(file) {

        let parsedData = {
            contacts : {  }
        };

        let minTimeStamp;
        let maxTimeStamp;

        let lines = file.split(/\n(?=\d{4}-\d{2}-\d{2},\d{2}:\d{2}:\d{2},\w)/);
        lines.slice(1).forEach((line) => {
            let nodes = line.split(',');
            if (nodes.length < 6)
                throw Error("fichier csv invalide : " + line);

            let day = nodes[0];
            let hour = nodes[1];

            let msgTimestamp = this.toTimeStamp(day, hour);
            let contact = nodes[4];
            let weight = nodes.slice(5).join(",").length;

            if (parsedData.contacts[contact] === undefined) {
                parsedData.contacts[contact] = [];
            }
            parsedData.contacts[contact].push({timestamp: msgTimestamp, weight: weight});

            if (minTimeStamp === undefined || msgTimestamp < minTimeStamp) {
                minTimeStamp = msgTimestamp;
            }

            if (maxTimeStamp === undefined || msgTimestamp > maxTimeStamp) {
                maxTimeStamp = msgTimestamp;
            }

            if(_.isNaN(minTimeStamp)) {
                debugger;
            }
        });

        parsedData.startDate = minTimeStamp;
        parsedData.endDate = maxTimeStamp;

        return parsedData;
    }

    static toTimeStamp( day, time )
    {
        moment.locale('fr');
        let format = "YYYY-MM-DD,HH:mm:ss";
        let date = moment(day + "," + time, format);
        return date.valueOf();
    }
}

module.exports = ParserSMS;