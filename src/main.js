const _ = require("lodash");
const React = require("react");
const render = require("react-dom").render;

const WebApp = require("./components/WebApp");

sigma.settings.scalingMode = "outside";


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


/******** PARSER *********/

let nodesId = {};
let nodesMap = {};
let edgesMap = {};
let nodesArray, edgesArray;

const Parsesms = function(file)
{
    let lines = file.split('\n');
    lines.forEach((line) => {
        let nodes  = line.split(';');
        if(nodes.length < 2)
            return;
        let source = nodes[0];
        let target = nodes[1];

        if(nodesMap[source] === undefined){
            nodesMap[source] = new Node(source);
        }
        if(nodesMap[target] === undefined){
            nodesMap[target] = new Node(target);
        }
        if(edgesMap[source+";"+target] === undefined) {
            edgesMap[source+";"+target] = new Edge(source, target);
        }
        else{
            edgesMap[source+";"+target].weight++;
        }
    });

    nodesArray = _.values(nodesMap);
    edgesArray = _.values(edgesMap);
    step(0);
};

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