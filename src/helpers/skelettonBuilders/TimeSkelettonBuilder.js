/**
 * Created by Felix Alié on 10/10/2016.
 */

const _ = require("lodash");

/**
 * Time Skeletton Builder
 */
class TimeSkelettonBuilder {
    /**
     * building method
     * @param graph
     * @param options
     * @returns {*}
     */
    static build(graph){
        var res = new Graph(graph);
        return res;
    }

}

TimeSkelettonBuilder.init();

module.exports = TimeSkelettonBuilder;

