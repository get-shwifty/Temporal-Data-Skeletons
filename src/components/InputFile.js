/**
 * Created by Félix Alié on 10/10/2016.
 */

/**
 * React Component to handle file input
  */
const _ = require("lodash");
const React = require("react");
const autoBind  = require("react-autobind");

class InputFile extends React.Component {

    constructor(props) {
        super(props);
        autoBind(this);
    }

    handleChange(evt){
        var f = evt.target.files[0];
        if (f) {
            var r = new FileReader();
            r.onload = (e) => {
                var contents = e.target.result;
                var options = {
                    type: this.refs.parseType.value,
                    build: {
                        buildType: "time",
                        granularity: {
                            type: this.refs.granularityType.value,
                            increment: this.refs.granularityInc.value
                        }
                    }
                };
                this.props.onFileUpload(contents,options);
            };
            r.readAsText(f);
        } else {
            throw new Error("Failed to load file");
        }
    }

    render() {
        return (
            <div id="inputFile">
                <input type="file" id="fileInput" onChange={this.handleChange}/>
                <select id="parseType" ref="parseType">
                    <option value="Facebook">Données facebook</option>
                    <option value="SMS">Données SMS (smsToText)</option>
                    <option value="CSV">Fichier CSV</option>
                </select>
                <select id="granularityType" ref="granularityType">
                    <option value="days">Jour</option>
                    <option value="weeks">Semaine</option>
                    <option value="months">Mois</option>
                </select>
                <input type="number" id="granularityInc" ref="granularityInc"/>
            </div>
        )
    }
}

module.exports = InputFile;