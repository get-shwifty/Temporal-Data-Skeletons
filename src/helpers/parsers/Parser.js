/**
 * Created by Felix Alié on 10/10/2016.
 */

const _ = require("lodash");

const parserSMS = require("./ParserSMS");
const parserFB = require("./ParserFB");

//helper de gestion des parseurs

class Parse {

    //parsing d'un fichier sms
    static parseFromSMS(file) {
        return parserSMS.parse(file);
    }

    //parsing d'un fichier facebook
    static parseFromFB(file) {
        return parserFB.parse(file);
    }
}

Parser.init();

module.exports = Parser;