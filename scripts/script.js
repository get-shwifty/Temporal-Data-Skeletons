/**
* Created by Felix on 28/09/2016.
*/

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

var s = new sigma();

s.addRenderer({
    type: 'canvas',
    container: 'container'
});


var nodeId = s.graph.nodes().length;
var edgeId = s.graph.edges().length;


//class noeud avec x et y aléatoires
class Node {
    constructor(id = "n" + Math.random()*Math.random()*100) {
        this.id = id;
        nodeId++;
        this.x = Math.random();
        this.y = Math.random();
        this.size = Math.random() * 15;
    }
}

//class lien
class Edge {
    constructor(s, t, id = "e" + Math.random()*Math.random()*100) {
        this.id = id;
        edgeId++;
        this.source = s;
        this.target = t;
        this.weight = 1;
    }
}
/*var nodes = _.times(1000, i => new Node());

var edges = _.times(1000, i => {
    let source = nodes[_.random(nodes.length - 1)];
    let target = nodes[_.random(nodes.length - 1)];
    return new Edge(source, target);
});


s.graph.addNodes(nodes);
s.graph.addEdges(edges);
s.refresh();*/


function readSingleFile(evt) {
    //Retrieve the first (and only!) File from the FileList object
    var f = evt.target.files[0];

    if (f) {
        var r = new FileReader();
        r.onload = function(e) {
            var contents = e.target.result;
            Parsesms(contents);
        }
        r.readAsText(f);
    } else {
        alert("Failed to load file");
    }
}

document.getElementById('fileinput').addEventListener('change', readSingleFile, false);








