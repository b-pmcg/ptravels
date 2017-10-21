var React = require('react');

var buttonStyle = {
  margin: '10px 10px 10px 0'
};

export default class NextShowButton extends React.Component {

    render() {
        return(
            <button
                onClick={this.props.onClick}
                className="btn btn-default"
                style={buttonStyle}>{this.props.label}
            </button>
        );
    }
}