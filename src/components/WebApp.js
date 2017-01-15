const _ = require("lodash");
const React = require("react");
const Parser = require("../helpers/parsers/Parser")
const autoBind  = require("react-autobind");
const InputFile = require("./InputFile");
const OptionsController = require("./OptionsController");
const Builder = require("../helpers/skelettonBuilders/SkelettonBuilder");
const Graph = require("../classes/Graph");
const Node = require("../classes/Node");
const Edge = require("../classes/Edge");

class WebApp extends React.Component {

    constructor(props) {
        super(props);
        autoBind(this);

        this.props.sigmaInstance.bind('clickNode', (e) => {
            console.log("node clicked bitches");
            let nodeId = e.data.node.id,
                toKeep = this.props.sigmaInstance.graph.neighbors(nodeId);
            toKeep[nodeId] = e.data.node;

            this.props.sigmaInstance.graph.nodes().forEach(function (n) {
                if (toKeep[n.id])
                    n.color = "green";
                else
                    n.color = '#eee';
            });

            this.props.sigmaInstance.graph.edges().forEach(function(e) {
                if (toKeep[e.source] && toKeep[e.target])
                    e.color = e.originalColor;
                else
                    e.color = '#eee';
            });

            this.props.sigmaInstance.refresh();
        });
    }

    startForceAtlas() {
        this.props.sigmaInstance.startForceAtlas2({
            barnesHutOptimize: false,
            iterationsPerRender: 3,
            edgeWeightInfluence: 1,
            maxNodeSize: 9999,
            maxEdgeSize: 20,
            labelColor: "node",
            labelThreshold: 0.01
        });
    }

    stopForceAtlas2() {
        this.props.sigmaInstance.stopForceAtlas2();
    }

    refresh() {
        this.props.sigmaInstance.refresh();
    }

    handlerFileUpload(content,options){
        let graph = Parser.parse(content,options.type);
        console.log(graph);
        graph = Builder.build(graph,options.build);
        console.log(_.mapValues(graph, (e) => _.values(e)));
        console.log("test");
        this.props.sigmaInstance.graph.clear().read(_.mapValues(graph, (e) => _.values(e)));
        this.refresh();
        //this.props.sigmaInstance.graph = JSON.stringify(graph);
        //build le squelette
        //afficher le tout
    }

    handlerOptionsModifications(options){
        this.props.sigmaInstance.configForceAtlas2(options);
        if(options.filter <= 0)
            this.props.filter.undo('filterBySize').apply();
        else
            this.props.filter.undo('filterBySize').nodesBy(n => {return (n.size > options.filter && n.type !== "skeleton") || n.type === "skeleton" }, 'filterBySize').apply();

    }

    render() {
        return (
            <nav id="menu">
                <InputFile onFileUpload={this.handlerFileUpload}/>
                <button id="startf2" className="myButton" onClick={this.startForceAtlas}>Start Force Atlas</button>
                <button id ="stopf2" className="myButton" onClick={this.stopForceAtlas2}> Stop Force Atlas</button>
                <button id="refresh" className="myButton" onClick={this.refresh}> Refresh </button>
                <OptionsController onOptionsChange={this.handlerOptionsModifications}/>
            </nav>
        )
    }
}

module.exports = WebApp;