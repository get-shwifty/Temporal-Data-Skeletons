const _ = require("lodash");
const React = require("react");
const Parser = require("../helpers/parsers/Parser")
const autoBind  = require("react-autobind");
const InputFile = require("./InputFile");
const Builder = require("../helpers/skelettonBuilders/SkelettonBuilder");
const Graph = require("../classes/Graph");
const Node = require("../classes/Node");
const Edge = require("../classes/Edge");

class WebApp extends React.Component {

    constructor(props) {
        super(props);
        autoBind(this);
    }

    startForceAtlas() {
        this.props.sigmaInstance.startForceAtlas2({
            barnesHutOptimize: false,
            iterationsPerRender: 3,
            edgeWeightInfluence: 1,
            maxNodeSize: 50,
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
        var graph = Parser.parse(content,options.type);
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

    render() {
        return (
            <nav id="menu">
                <InputFile onFileUpload={this.handlerFileUpload}/>
                <button id="startf2" className="myBouton" onClick={this.startForceAtlas}>Start Force Atlas</button>
                <button id ="stopf2" className="myBouton" onClick={this.stopForceAtlas2}> Stop Force Atlas</button>
                <button id="refresh" className="myBouton" onClick={this.refresh}> Refresh </button>
            </nav>
        )
    }
}

module.exports = WebApp;