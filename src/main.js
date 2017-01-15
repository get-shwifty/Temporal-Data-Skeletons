const _ = require("lodash");
const React = require("react");
const render = require("react-dom").render;

const WebApp = require("./components/WebApp");

sigma.settings.scalingMode = "outside";

sigma.classes.graph.addMethod('neighbors', function(nodeId) {
    var k,
        neighbors = {},
        index = this.allNeighborsIndex[nodeId] || {};

    for (k in index)
        neighbors[k] = this.nodesIndex[k];

    return neighbors;
});


const s = new sigma();
s.addRenderer({
    type: "canvas",
    container: "container"
});


global.app = render(
    <WebApp sigmaInstance={s} />,
    document.getElementById("containerReact")
);

////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
// TODO : refactor the code below
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////

/******** SCRIPT *********/

window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

function step(i) {
    s.graph.addNode(nodesArray[i]);
    let e = edgesArray.filter(function(e) {
        return s.graph.nodes(e.sourceNode)
            && s.graph.nodes(e.target)
            && !s.graph.edges(e.id);
    });
    s.graph.addEdges(e);

    s.refresh();
    if(i + 1 < nodesArray.length) {
        requestAnimationFrame(step.bind(null, i + 1));
    }
}