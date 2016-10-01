/**
 * Created by Felix on 29/09/2016.
 */


var nodesId = {};

Parsesms = function(file)
{
    var lines = file.split('\n');
    lines.forEach((line) => {
        var nodes  = line.split(';');
        var source = nodes[0];
        var target = nodes[1];
        if(nodes.length < 2) {
            return;
        }

        if(s.graph.nodes(source) === undefined){
            var n1 = new Node(source);
            s.graph.addNode(n1);
        }
        if(s.graph.nodes(target) === undefined){
            var n2 = new Node(target);
            s.graph.addNode(n2);
        }
        if(s.graph.edges(source+";"+target) === undefined) {
            var e = new Edge(s.graph.nodes(source), s.graph.nodes(target), source + ";" + target);
            s.graph.addEdge(e);
        }
        else{
            s.graph.edges(source+";"+target).weight++;
        }
    });
    s.refresh();
};