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
            edgeWeightInfluence : this.refs.edgeWeightInfluence.value,
            gravity: this.refs.gravity.value,
            filter: this.refs.filter.value,
            beginning: this.refs.beginning.value,
            ending: this.refs.ending.value
        };
        console.log(options);
        this.props.onOptionsChange(options);
    }

    render() {
        return (
            <div className="container">
                <div className="sliderContainer" onChange={this.handleChange}>
                    <span>Edge Weight Influence</span>
                    <input type="number" placeholder="value" ref="edgeWeightInfluence"/>
                </div>
                <div className="sliderContainer" onChange={this.handleChange}>
                    <span>Gravity</span>
                    <input type="number" placeholder="value" ref="gravity"/>
                </div>
                <div className="sliderContainer" onChange={this.handleChange}>
                    <span>Filter Node by Edges</span>
                    <input type="number" placeholder="value" ref="filter"/>
                </div>
                <div className="sliderContainer" onChange={this.handleChange}>
                    <span>Skeleton Beginning</span>
                    <input type="date" placeholder="value" ref="beginning"/>
                </div>
                <div className="sliderContainer" onChange={this.handleChange}>
                    <span>Skeleton Ending</span>
                    <input type="date" placeholder="value" ref="ending"/>
                </div>
            </div>
        )
    }
}

module.exports = OptionsController;