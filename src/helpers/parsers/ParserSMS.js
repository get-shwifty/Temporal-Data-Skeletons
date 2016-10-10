/**
 * Created by Felix Alié on 10/10/2016.
 */



const _ = require("lodash");
//helper permettant de parser un fichier csv extrait avec l'application smsToCsv

class ParserSMS {

    //méthode de parsing
    static parse(file) {
        var res = {};
        var lines = file.split('\n');

        lines.forEach((line) => {
            //do something
        });
        return res;
    }
}

ParserSMS.init();

module.exports = ParserSMS;