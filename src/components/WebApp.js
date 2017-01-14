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
    }

    startForceAtlas() {
        this.props.sigmaInstance.startForceAtlas2({
            barnesHutOptimize: false,
            iterationsPerRender: 3,
            edgeWeightInfluence: 0
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

    handlerOptionsModifications(options){
        console.log("on rentre bien là ou il faut");
        this.props.sigmaInstance.configForceAtlas2(options);

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