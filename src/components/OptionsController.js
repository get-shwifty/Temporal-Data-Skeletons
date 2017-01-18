/**
 * Created by Felix Alié on 14/01/2017.
 */

/**
 * React Component to control sigma settings
 */
const _ = require("lodash");
const React = require("react");
const autoBind  = require("react-autobind");

class OptionsController extends React.Component {

    constructor(props) {
        super(props);
        autoBind(this);
    }

    handleChange(){
        let options = {
            filter: this.refs.filter.value,
            beginning: this.refs.beginning.value,
            ending: this.refs.ending.value
        };
        console.log(options);
        this.props.onOptionsChange(options);
    }

    handleForceAtlasChange(){
        let options = {
            edgeWeightInfluence : this.refs.edgeWeightInfluence.value,
            gravity: this.refs.gravity.value,
        };
        this.props.onForceAtlasOptionsChange(options);
    }

    changeEdges(){
       this.props.onEdgeChange();
    }

    render() {
        return (
            <div className="container">
                <div className="sliderContainer" onChange={this.handleForceAtlasChange}>
                    <span>Edge Weight Influence</span>
                    <input type="number" placeholder="value" min="0" max="5" step="0.1" ref="edgeWeightInfluence"/>
                </div>
                <div className="sliderContainer" onChange={this.handleForceAtlasChange}>
                    <span>Gravity</span>
                    <input type="number" placeholder="value" min="0" max="5" step="0.1" ref="gravity"/>
                </div>
                <div className="sliderContainer" onChange={this.handleChange}>
                    <span>Filter Node by Edges</span>
                    <input type="number" placeholder="value" step="1" ref="filter"/>
                </div>
                <div className="sliderContainer" onChange={this.handleChange}>
                    <span>Skeleton Beginning</span>
                    <input type="date" placeholder="value" ref="beginning"/>
                </div>
                <div className="sliderContainer" onChange={this.handleChange}>
                    <span>Skeleton Ending</span>
                    <input type="date" placeholder="value" ref="ending"/>
                </div>
                <div className="buttonContainer" >
                    <div className="myButton" onClick={this.changeEdges}> Change Edge Skin </div>
                </div>
            </div>
        )
    }
}

module.exports = OptionsController;