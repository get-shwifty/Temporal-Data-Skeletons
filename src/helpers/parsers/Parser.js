/**
 * Created by Felix Alié on 10/10/2016.
 */

const _ = require("lodash");
const parserSMS = require("./ParserSMS");
const parserFB = require("./ParserFB");


/**
 * Parsers Manager's.
 */
class Parser {

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
}

Parser.init();

module.exports = Parser;