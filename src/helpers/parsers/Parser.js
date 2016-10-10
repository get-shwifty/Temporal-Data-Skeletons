/**
 * Created by Felix Alié on 10/10/2016.
 */

const _ = require("lodash");
const parserSMS = require("./ParserSMS");
const parserFB = require("./ParserFB");
const parserCSV = require("./ParserCSV");


/**
 * Parsers Manager's.
 */
class Parser {

    /**
     * Main parsing method
     * @param file
     * @param type
     * @returns {*}
     */
    static parse(file, type){
        switch(type){
            case "SMS":
                return this.parseFromSMS(file);
            case "Facebook":
                return this.parseFromFB(file);
            default:
                return this.parseFromCSV(file);
        }
    }
    /**
     * Sms file parsing method
     * @param file
     * @returns {*}
     */

    static parseFromSMS(file) {
        return parserSMS.parse(file);
    }

    /**
     * Facebook file parsing method
     * @param file
     * @returns {*}
     */
    static parseFromFB(file) {
        return parserFB.parse(file);
    }

    static parseFromCSV(file){
        return parserCSV.parse(file);
    }
}

Parser.init();

module.exports = Parser;