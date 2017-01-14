/**
 * Created by Felix Alié on 10/10/2016.
 */

const _ = require("lodash");
const timeSkeletton = require("./TimeSkelettonBuilder");


/**
 * Skeletton Builders Managers
 */
class SkelettonBuilder {
    static build(parsedData, options = {}){
        switch(options.buildType){
            case "time":
                return this.buildTimeSkeletton(parsedData,options.granularity);
        }
    }
    /**
     * time skeletton builder methods
     * @param parsedData
     * @param options
     * @returns {*}
     */
    static buildTimeSkeletton(parsedData, options = {}){
        return timeSkeletton.build(parsedData,options);
    }
}


module.exports = SkelettonBuilder;

