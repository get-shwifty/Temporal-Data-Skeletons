const _ = require("lodash");
const React = require("react");
const render = require("react-dom").render;

const WebApp = require("./components/WebApp");

sigma.settings.scalingMode = "outside";

//permet d'ajouter plusieurs noeuds d'un coup
sigma.classes.graph.addMethod('addNodes', function (tab) {
    tab.forEach((node)=> {
        this.addNode(node);
    });
});
//permet d'ajouter plusieurs edges d'un coup
sigma.classes.graph.addMethod('addEdges', function (tab) {
    tab.forEach((edge)=> {
        this.addEdge(edge);
    });
});

const s = new sigma();
s.addRenderer({
    type: "canvas",
    container: "container"
});


render(
    <WebApp sigmaInstance={s} />,
    document.getElementById("containerReact")
);

////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
// TODO : refactor the code below
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////

/******** SCRIPT *********/



function readSingleFile(evt) {
    //Retrieve the first (and only!) File from the FileList object
    var f = evt.target.files[0];

    if (f) {
        var r = new FileReader();
        r.onload = function(e) {
            var contents = e.target.result;
            Parsesms(contents);
        };
        r.readAsText(f);
    } else {
        alert("Failed to load file");
    }
}

document.getElementById('fileinput').addEventListener('change', readSingleFile, false);

/******** PARSER *********/

var nodesId = {};
var nodesMap = {};
var edgesMap = {};
var nodesArray, edgesArray;

const Parsesms = function(file)
{
    var lines = file.split('\n');
    lines.forEach((line) => {
        var nodes  = line.split(';');
        if(nodes.length < 2)
            return;
        var source = nodes[0];
        var target = nodes[1];

        if(nodesMap[source] === undefined){
            nodesMap[source] = new Node(source);
        }
        if(nodesMap[target] === undefined){
            nodesMap[target] = new Node(target);
        }
        if(edgesMap[source+";"+target] === undefined) {
            edgesMap[source+";"+target] = new Edge(source, target, source + ";" + target);
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
    var e = edgesArray.filter(function(e) {
        return s.graph.nodes(e.source)
            && s.graph.nodes(e.target)
            && !s.graph.edges(e.id);
    });
    s.graph.addEdges(e);

    s.refresh();
    if(i + 1 < nodesArray.length) {
        requestAnimationFrame(step.bind(null, i + 1));
    }
}