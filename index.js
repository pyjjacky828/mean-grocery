// console.log("Jacky Peng's Grocery List");
var express = require("express");
var app = express();

var mongoose = require('mongoose');

listitem = require('./server/listitem');

mongoose.connect('mongodb://localhost/grocery');
var db = mongoose.connection;

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static(__dirname+"/public"));

var port = process.env.PORT || 3000;

app.get('/api/items', (req, res) => {    
	listitem.getItems((err, items) => {
		if(err){
			throw err;
        }
		res.json(items);
	});
});

app.post('/api/items', (req, res) => {
	var Item = req.body;
	listitem.addItem(Item, (err, Item) => {
		if(err){
			throw err;
		}
		res.json(Item);
	});
});

app.put('/api/items/:_id', (req, res) => {
	var id = req.params._id;
	var Item = req.body;
	listitem.updateItem(id, Item, {}, (err, Item) => {
		if(err){
			throw err;
		}
		res.json(Item);
	});
});

app.delete('/api/items/:_id', (req, res) => {
	var id = req.params._id;
	listitem.removeItem(id, (err, items) => {
		if(err){
			throw err;
		}
		res.json(items);
	});
});

app.listen(port);