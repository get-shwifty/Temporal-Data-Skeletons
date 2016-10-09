const _ = require("lodash");
const React = require("react");
const autoBind  = require("react-autobind");

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

    render() {
        return (
            <nav id="menu">
                <input type="file" id="fileinput" />
                <button id="startf2" className="myBouton" onClick={this.startForceAtlas}>Start Force Atlas</button>
                <button id ="stopf2" className="myBouton" onClick={this.stopForceAtlas2}> Stop Force Atlas</button>
                <button id="refresh" className="myBouton" onClick={this.refresh}> Refresh </button>
            </nav>
        )
    }
}

module.exports = WebApp;