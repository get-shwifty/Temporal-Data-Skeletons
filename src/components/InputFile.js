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
        let f = evt.target.files[0];
        if (f) {
            let r = new FileReader();
            r.onload = (e) => {
                let contents = e.target.result;
                let options = {
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
                <label className="myButton">
                    <input type="file" id="fileInput" onChange={this.handleChange}/>
                    Upload File
                </label>
                <select className="mySelect" id="parseType" ref="parseType">
                    <option value="Facebook">Données facebook</option>
                    <option value="SMS">Données SMS (smsToText)</option>
                    <option value="CSV">Fichier CSV</option>
                </select>
                <select className="mySelect" id="granularityType" ref="granularityType">
                    <option value="days">Jours</option>
                    <option value="months">Mois</option>
                    <option value="years">Années</option>
                </select>
                <input type="number" id="granularityInc" ref="granularityInc" />
            </div>
        )
    }
}

module.exports = InputFile;