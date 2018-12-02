var React = require('react');
var axios = require('axios');
var Image = require('Image');
var { Button, FormGroup, FormControl, ControlLabel } = require('react-bootstrap');
import styled from 'styled-components';

var Abc = React.createClass({
  getInitialState: function() {
    return {
      allworkspace: []
    }
  },
 componentDidMount(){
 var _this = this;
    axios({
          url: `http://stormy-meadow-14917.herokuapp.com/getallworkspaceData`,
          method: 'get',
          headers: {
              'Content-Type': 'application/json'
          }
         })
         .then(response => {
             console.log("response data is",response.data);
             _this.setState({
                  allworkspace: response.data
                });
         }) 
         .catch(err => {
           console.log(err);
           // throw new Error(response.data.message);
         });
},
render: function() {
    return (
          <FilterableContactTable workspace={this.state.allworkspace} />
    )
  }
});

module.exports = Abc;

class ContactRow extends React.Component {
  constructor(props) {
    super(props);
    this.onItemClickHandler = this.onItemClickHandler.bind(this);
  }
  onItemClickHandler(event){
    var id =  this.props.contact.ID;
    console.log(this);
    openPopup(this);
  }
  render() {
    return (
      <tr onClick={this.onItemClickHandler} className="theList">
        <td width="30%"><Image source={this.props.contact.space_imageurl} text={this.props.contact.workspace_name} /></td>
        <td>{this.props.contact.workspace_name}</td>
        <td>{this.props.contact.capacity}</td>
        <td>{this.props.contact.workspace_type}</td>
        <td><button  bsSize="small" className="button">{this.props.contact.availability}</button></td>
      </tr>
    );
  }
}

class ContactTable extends React.Component {
  render() {
    var rows = [];
    this.props.workspace.forEach((contact) => {
      if (contact.workspace_name.indexOf(this.props.filterText) === -1) {
        return;
      }
      rows.push(<ContactRow contact={contact} />);
    });
    return (
      <table className='table'>
        <thead>
          <tr>
            <th>Workspace Image</th>
            <th>Workspace Name</th>
            <th>Capacity</th>
            <th>Type</th>
            <th>Availability</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleFilterTextInputChange = this.handleFilterTextInputChange.bind(this);
  }
  
  handleFilterTextInputChange(e) {
    this.props.onFilterTextInput(e.target.value);
  }

  render() {
    return (
      <form>
        <input
          className="form-control"
          type="text"
          placeholder="Search..."
          value={this.props.filterText}
          onChange={this.handleFilterTextInputChange}
        />
      </form>
    );
  }
}

class FilterableContactTable extends React.Component {
  constructor(props) {
    super(props);
    // FilterableContactTable is the owner of the state as the filterText is needed in both nodes (searchbar and table) that are below in the hierarchy tree.
    this.state = {
      filterText: ''
    };
    
    this.handleFilterTextInput = this.handleFilterTextInput.bind(this);
    
  }

  handleFilterTextInput(filterText) {
    //Call to setState to update the UI
    this.setState({
      filterText: filterText
    });
    //React knows the state has changed, and calls render() method again to learn what should be on the screen
  }
  
  render() {
    return (
      <div>
        <h2>Workspace List</h2>
        <SearchBar
          filterText={this.state.filterText}
          onFilterTextInput={this.handleFilterTextInput}
        />
        <ContactTable
          workspace={this.props.workspace}
          filterText={this.state.filterText}
        />
        <ReactPopup />
      </div>
    );
  }
}

function openPopup(_this) {
  if(typeof Popup == "undefined") {
    return;
  }
  Popup.open(<div>
      <div className="body">
         <table className='table'>
        <thead>
          <tr>
            <th>Hourly Rates</th>
            <th>Daily Rates</th>
            <th>Monthly Rates</th>
            <th>Availability</th>
          </tr>
        </thead>
        <tbody>
           <tr>
             <td>{_this.props.contact.hourly_rates}/hour</td>
             <td>{_this.props.contact.daily_rates}/day</td>
             <td>{_this.props.contact.monthly_rates}/month</td>
             <td>{_this.props.contact.availability}</td>
           </tr>
        </tbody>
      </table>
      </div>
      <div className="footer">
        <button className="btn default" onClick={() => Popup.close()}>Cancel</button>
      </div>
    </div>);
}

class ReactPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      content: ""
    };
    this.open  = this.open.bind(this);
    this.close = this.close.bind(this);
  }
  componentDidMount() {
    window.Popup = this;
    if(this.props.onready && typeof this.props.onready == "function") {
      this.props.onready.call();
    }
  }
  open(content) {
    this.setState({
      active: true,
      content: content
    });
  }
  close() {
    this.setState({
      active: false
    });
  }
  update(content) {
    this.setState({
      content: content
    });
  }
  render() {
    return <div id="popup" className={this.state.active ? "in" : ""}>
      <div className="bg"></div>
      <div className="modal">
        <div className="close" onClick={this.close}>&times;</div>
        {this.state.content}
      </div>
    </div>;
  }
}


