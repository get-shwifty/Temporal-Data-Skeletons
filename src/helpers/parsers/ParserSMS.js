/**
 * Created by Felix Alié on 10/10/2016.
 */

const Graph = require("../../classes/Graph");
const Node = require("../../classes/Node");
const Edge = require("../../classes/Edge");

const moment = require("moment");
require("moment/locale/fr");

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
        var res = new Graph();
        res.metadata.type = Graph.TYPE.classicalGraph;
        var lines = file.split(/\n(?=\d{4}-\d{2}-\d{2},\d{2}:\d{2}:\d{2},\w)/);
        lines.forEach((line) => {
            var nodes  = line.split(',');
            if(nodes.length < 6)
                throw Error("fichier csv invalide : " + line);

            var day = nodes[0];
            var hour = nodes[1];
            var source = new Node( this.toTimeStamp(day, hour));
            var target = new Node(nodes[4]);
            res.addNodes([source,target]);
            var weight = nodes.slice(5).join(",").length;
            var edge = new Edge(source, target, { weight: weight});
            res.addEdge(edge);
        });
        return res;
    }

    static toTimeStamp( day, time )
    {
        moment.locale('fr');
        let format = "YYYY-MM-DD,HH:mm:ss";
        let date = moment(day+","+time, format);
        console.log( day+","+time+ "  ------>   " + date.valueOf());
        return date.valueOf();
    }
}

/*2013-11-18,15:29:33,out,+33645469463,papa,VoilÃ  premier SMS du  nexus ! !ðŸ˜
 2013-11-18,16:09:37,in,+33628531679,Flore,"Perrine a ton paquet elle et au 4eme etage dz la bu je crois, demande lui confirmation"*/

module.exports = ParserSMS;