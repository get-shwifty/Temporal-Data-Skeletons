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
            if( this.props.sigmaInstance.isForceAtlas2Running() ){
                return;
            }

            var nodeId = e.data.node.id,
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

            this.props.sigmaInstance.graph.edges().forEach(function(e) {
                if ( ( toKeep[e.source] && ( toKeep[e.target] || skelNodes[e.target] ) )
                || ( toKeep[e.target] && ( toKeep[e.source] || skelNodes[e.source] ) ) )
                {
                    e.color = e.originalColor;
                }
                else if (skelNodes[e.source] && skelNodes[e.target] ){
                    e.color =  "#000000";
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


        this.props.sigmaInstance.graph.nodes().forEach(function(n) {
            n.originalColor = n.color;
        });
        this.props.sigmaInstance.graph.edges().forEach(function(e) {
            e.originalColor = e.color;
        });
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