var React = require('react');
import styled from 'styled-components';

var Image = React.createClass({
render: function() {
    return (
       <ImageComponent src={this.props.source} alt={this.props.text} />
    )
  }
});

module.exports = Image;

const ImageComponent = styled.img`
	width: 65%;
	height: 25%;
`;