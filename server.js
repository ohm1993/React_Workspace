var express = require('express');
var firebase = require("firebase-admin");
var bodyParser = require('body-parser');
var serviceAccount = require("./serviceAccountKey.json");

// Create our app
var app = express();
const PORT = process.env.PORT || 3000;
const cors = require('cors');

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(function (req, res, next){
  if (req.headers['x-forwarded-proto'] === 'https') {
    res.redirect('http://' + req.hostname + req.url);
  } else {
    next();
  }
});

app.use(express.static('public'));

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: "https://sneedtask.firebaseio.com"
});

var db = firebase.database();

app.get('/getallworkspaceData',function(req, res){
	var spaceDetails=[];
	var ref = db.ref().child('workspacedata');
	ref.once('value', function(snapshot){
		if(snapshot.val() != null){
			 res.json(snapshotToArray(snapshot));
			 //console.log(snapshotToArray(snapshot));
		}else{
           res.json(snapshot.val());
           console.log("data is null their");
		} 
    });
});

function snapshotToArray(snapshot) {
    var returnArr = [];

    snapshot.forEach(function(childSnapshot) {
        var item = childSnapshot.val();
        item.key = childSnapshot.key;

        returnArr.push(item);
    });

    return returnArr;
};

app.get('/getworkspacebyId/:id',function(req,res){
    var id = req.params.id;
    console.log("id is",id);
    var singledata = firebase.database().ref().child('workspacedata').orderByChild('ID').equalTo(id);
    singledata.on('value',function(snapshot){
    	if (snapshot.val() != null){
    		 res.json(snapshotToArray(snapshot));
    		 console.log("value is",snapshot.val());
    	}else{
    		console.log("id not found");
    	}
    });
});

app.listen(PORT, function () {
  console.log('Express server is up on port ' + PORT);
});
