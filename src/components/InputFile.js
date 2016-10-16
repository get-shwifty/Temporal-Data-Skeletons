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
                this.props.onFileUpload(contents,this.refs.parseType.value);
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
            </div>
        )
    }
}

module.exports = InputFile;