var React = require('react');
var Nav = require('Nav');

var Main = (props) => {
  return (
    <div>
      <Nav/>
      <div className="row">
        <div className="columns medium-12 centered">
          {props.children}
        </div>
      </div>
    </div>
  );
}

module.exports = Main;
