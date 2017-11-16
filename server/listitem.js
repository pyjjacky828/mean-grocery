var mongoose = require("mongoose");

var itemSchema = mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    note:{
        type: String
    },
    checked:{
        type: Boolean,
        default: false
    }
});

var listitem = module.exports = mongoose.model("Items",itemSchema);

// Get Items
module.exports.getItems = (callback, limit) => {
	listitem.find(callback).limit(limit);
}

// Add Item
module.exports.addItem = (item, callback) => {
	listitem.create(item, callback);
}

// Update Item
module.exports.updateItem = (id, item, options, callback) => {
	var query = {_id: id};
	var update = {
        title: item.title,
        note:item.note,
        checked:item.checked
	}
	listitem.findOneAndUpdate(query, update, options, callback);
}


// Delete Item
module.exports.removeItem = (id, callback) => {
	var query = {_id: id};
	listitem.remove(query, callback);
}