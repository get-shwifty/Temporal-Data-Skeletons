/**
 * Created by Felix Alié on 10/10/2016.
 */

const _ = require("lodash");
const timeSkeletton = require("./TimeSkelettonBuilder");


/**
 * Skeletton Builders Managers
 */
class SkelettonBuilder {
    static build(graph, options = {}){
        switch(options.buildType){
            case "time":
                return this.buildTimeSkeletton(graph,options.granularity);
        }
    }
    /**
     * time skeletton builder methods
     * @param graph
     * @param options
     * @returns {*}
     */
    static buildTimeSkeletton(graph, options = {}){
        return timeSkeletton.build(graph,options);
    }
}


module.exports = SkelettonBuilder;

