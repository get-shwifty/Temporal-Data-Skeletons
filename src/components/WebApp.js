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
const moment = require("moment");

class WebApp extends React.Component {

    constructor(props) {
        super(props);
        autoBind(this);
        this.state = {};

        this.props.sigmaInstance.bind('clickNode', (e) => {
            if( this.props.sigmaInstance.isForceAtlas2Running() ){
                return;
            }
            let clickedNode = e.data.node;
            let nodeId = e.data.node.id,
                toKeep = this.props.sigmaInstance.graph.neighbors(nodeId);
            toKeep[nodeId] = e.data.node;

            let skelNodes = this.props.sigmaInstance.graph.nodes().filter(n => n.type === "skeleton");
            skelNodes = _.zipObject( _.map(skelNodes,"id"), skelNodes);

            this.props.sigmaInstance.graph.nodes().forEach(function (n) {
                if (toKeep[n.id])
                    n.color = n.originalColor;
                else
                    n.color = '#eee';
            });

            this.props.sigmaInstance.graph.edges().forEach((e) => {
                if ( ( toKeep[e.source] && ( toKeep[e.target] || skelNodes[e.target] ) )
                || ( toKeep[e.target] && ( toKeep[e.source] || skelNodes[e.source] ) ) )
                {
                    e.color = clickedNode.color;
                }
                else if (skelNodes[e.source] && skelNodes[e.target] ){
                    e.color =  e.originalColor;
                }
                else{
                    e.color = 'transparent';
                }
            });

            this.props.sigmaInstance.refresh();
        });

        this.props.sigmaInstance.bind('clickStage', (e) => {
            if( this.props.sigmaInstance.isForceAtlas2Running() ){
                return;
            }

            this.props.sigmaInstance.graph.nodes().forEach(function(n) {
                n.color = n.originalColor;
            });

            this.props.sigmaInstance.graph.edges().forEach(function(e) {
                e.color = e.originalColor;
            });

            // Same as in the previous event:
            this.props.sigmaInstance.refresh();
        });
    }

    startForceAtlas() {

        //disable link display when running the force atlas
        let skelNodes = this.props.sigmaInstance.graph.nodes().filter(n => n.type === "skeleton");
        skelNodes = _.zipObject( _.map(skelNodes,"id"), skelNodes);

        this.props.sigmaInstance.graph.edges().forEach(function(e) {
            if( !(skelNodes[e.source] && skelNodes[e.target]))
            {
                e.color = 'transparent';
            }
        });


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

        //enable link display after running the force atlas
        this.props.sigmaInstance.graph.edges().forEach(function(e) {
            e.color = e.originalColor;
        });

        this.props.sigmaInstance.refresh();
    }

    restartForceAtlas(){
        let wasFA2Running = this.props.sigmaInstance.isForceAtlas2Running();
        this.props.sigmaInstance.killForceAtlas2();
        //this.saveGraph();
        if(wasFA2Running) this.startForceAtlas();
    }

    refresh() {
        this.props.sigmaInstance.refresh();
    }

    saveGraph(){
        let nodes = this.props.sigmaInstance.graph.nodes();
        nodes.forEach(n => {
            n.savedDegree = this.props.sigmaInstance.graph.degree(n.id);
        });
        this.setState({'savedNodes': nodes, 'savedEdges': this.props.sigmaInstance.graph.edges()});
    }

    handlerFileUpload(content,options){
        let parsedData = Parser.parse(content,options.type);
        this.setState( {parsedData});
        let graph = Builder.build(parsedData,options.build);
        try
        {
            this.props.sigmaInstance.graph.clear().read(_.mapValues(graph, (e) => _.values(e)));
        }catch(e)
        {
            console.log(e);
        }
        this.saveGraph();
        this.refresh();


        this.props.sigmaInstance.graph.nodes().forEach(function(n) {
            n.originalColor = n.color;
        });
        this.props.sigmaInstance.graph.edges().forEach(function(e) {
            e.originalColor = e.color;
        });
    }

    rebuildGraph() {
        let set = new Set();
        let nodes = _.filter(this.state.savedNodes, n => {
            if ((n.savedDegree > this.state.filterParams.filter && n.type !== "skeleton")
                || (n.type === "skeleton" && n.id >= this.state.filterParams.beginning && n.id <= this.state.filterParams.ending)) {
                set.add(n.id);
                return true;
            }
            return false;
        });
        let edges = _.filter(this.state.savedEdges, e => {
            return set.has(e.source) && set.has(e.target);
        });
        this.props.sigmaInstance.graph.clear().read({nodes, edges});
        this.refresh();

            //.read(_.mapValues(this.state.savedGraph, (e) => _.values(e)))
    }


    handlerOptionsModifications(options){
        if(options.filter == "") options.filter = 1;

        if(options.beginning !== "") {
            options.beginning = moment(options.beginning, 'YYYY-MM-DD').valueOf();
        }
        else {
            options.beginning = -Infinity;
        }
        if(options.ending !== ""){
            options.ending = moment(options.ending, 'YYYY-MM-DD').valueOf();
        }
        else {
            options.ending = +Infinity;
        }

        this.restartForceAtlas();
        this.setState({filterParams: options});
        //this.saveGraph();
        this.rebuildGraph();
    }

    handlerForceAtlasOptionsChange(options){
        if(options.gravity == "") options.gravity = 1;
        if(options.edgeWeightInfluence == "") options.edgeWeightInfluence = 1;
        this.props.sigmaInstance.configForceAtlas2(options);
    }

    changeEdgesSkin(){
        _.map(this.props.sigmaInstance.graph.edges(),e => {
            if(e.type === "curve"){
                e.type = "line";
            }
            else if(e.type === "line"){
                e.type = "curve"
            }
        });
        this.props.sigmaInstance.refresh();
    }

    refreshGranularity(options){
        let wasFA2Running = this.props.sigmaInstance.isForceAtlas2Running();
        this.props.sigmaInstance.killForceAtlas2();

        let graph = Builder.build(this.state.parsedData,options.build);
        this.props.sigmaInstance.graph.clear().read(_.mapValues(graph, (e) => _.values(e)));
        this.refresh();

        this.props.sigmaInstance.graph.nodes().forEach(function(n) {
            n.originalColor = n.color;
        });
        this.props.sigmaInstance.graph.edges().forEach(function(e) {
            e.originalColor = e.color;
        });
        this.rebuildGraph();
        if(wasFA2Running) this.startForceAtlas();
    }

    render() {
        return (
            <nav id="menu">
                <InputFile onFileUpload={this.handlerFileUpload} onRefreshGranularity={this.refreshGranularity}/>
                <button id="startf2" className="myButton" onClick={this.startForceAtlas}>Start Force Atlas </button>
                <button id ="stopf2" className="myButton" onClick={this.stopForceAtlas2}> Stop Force Atlas</button>
                <OptionsController onOptionsChange={this.handlerOptionsModifications} onEdgeChange={this.changeEdgesSkin} onForceAtlasOptionsChange={this.handlerForceAtlasOptionsChange}/>
            </nav>
        )
    }
}

module.exports = WebApp;