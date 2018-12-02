var React = require('react');
var {Link, IndexLink} = require('react-router');

var Nav = React.createClass({
  onSearch: function (e) {
      e.preventDefault();
      alert('Not yet wired up!');
  },
  render: function () {
    return (
      <div className="top-bar">
        <div className="top-bar-left">
          <ul className="menu">
            <li className="menu-text">React Workspace App</li>
            <li>
              <Link to="/shownearworkSpace" activeClassName="active" activeStyle={{fontWeight: 'bold'}}>Workspace</Link>
            </li>
          </ul>
        </div>
      </div>
    );
  }
});

module.exports = Nav;
