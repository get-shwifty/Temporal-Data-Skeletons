/**
 * Created by Felix Alié on 10/10/2016.
 */

const _ = require("lodash");

/**
 * SMS File Parser
 */
class ParserCSV {

    /**
     * main parsing method
     * @param file
     * @returns {{}}
     */
    static parse(file) {
        var res = {};
        var lines = file.split('\n');

        lines.forEach((line) => {
            //do something
        });
        return res;
    }
}

ParserCSV.init();

module.exports = ParserCSV;