/**
 * Created by Felix on 29/09/2016.
 */


var nodesId = {};
var nodesMap = {};
var edgesMap = {};
var nodesArray, edgesArray;

Parsesms = function(file)
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
    // s.graph.addNodes(nodesArray);
    // s.graph.addEdges(edgesArray);
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

