//Import All Required Node Modules
var express = require('express')
var ejs = require('ejs')
var mongoose = require('mongoose');
var bodyParser = require('body-parser')


mongoose.connect('mongodb://aaa:aaa@ds243325.mlab.com:43325/hhh');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {         
      // we're connected!
      console.log("Connected To MongoLab Cloud Database :p");
  }); 

//Schema Setup
var urlSchema = mongoose.Schema({
	url: String,
	key: String
});

//Model Setup
var Url=mongoose.model('Url', urlSchema);


var app = express()
app.use(require('body-parser').urlencoded({ extended: true }));

app.set('view engine', 'ejs');

//Setting up port
app.set('port', 5000)


//Index route
app.get('/', function(req, res){
	res.render('form');
})

//app.use(bodyParser.json())
app.get('/:userkey',function(req, res){

Url.findOne({key:req.params.userkey},function (err, url) {
	if (err) return console.error(err);

	/*console.log('->'+url);
	console.log(url.url);
	res.redirect(url.url);*/
	console.log(url)
	if(url)
	res.redirect(url.url);
	else
	res.redirect("http://localhost:5000/me")
});

})

app.get('/me', function(req, res){
	res.render('me');
})


app.post('/create',function(req, res){
	var userUrl = req.body.url;
	var userKey = req.body.key;
	var newUrl = new Url({ url: userUrl,key: userKey});


	newUrl.save(function (err, testEvent) {
	//if (err) return console.error(err);
	console.log("Short Url Created!!");
});
	res.send('abc')
})



app.listen(app.get('port'), function() {
	console.log('server started')
})