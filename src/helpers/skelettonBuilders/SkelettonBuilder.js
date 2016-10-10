/**
 * Created by Felix Alié on 10/10/2016.
 */

const _ = require("lodash");
const timeSkeletton = require("./TimeSkelettonBuilder");


/**
 * Skeletton Builders Managers
 */
class SkelettonBuilder {
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

SkelettonBuilder.init();

module.exports = SkelettonBuilder;

