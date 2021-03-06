var React = require('react');
var ReactDOM = require('react-dom');
import 'babel-polyfill';
var {Route, Router, IndexRoute, hashHistory} = require('react-router');
var Main = require('Main');
var Showworkspace = require('Showworkspace');


// Load foundation
require('style!css!foundation-sites/dist/foundation.min.css')
$(document).foundation();

// App css
require('style!css!sass!applicationStyles')

ReactDOM.render(
 <Router history={hashHistory}>
    <Route path="/" component={Main}>
      <Route path="shownearworkSpace" component={Showworkspace}/>
      <IndexRoute component={Showworkspace}/>
    </Route>
  </Router>,
  document.getElementById('app')
);
