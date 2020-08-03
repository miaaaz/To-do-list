const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const date = require(__dirname + '/date.js');
const keys = require("./config/keys");

const app = express();

let port = process.env.PORT;
if (port == null || port == "") {
    port = 3000;
}

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
mongoose.connect(keys.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

// Database initialization
const itemSchema = {
    name : String
};

// Mongoose model usually is capitalized
const Item = mongoose.model('Item', itemSchema);


// Homepage
app.get('/', (req, res) => {
    const day = date();
    Item.find({}, (err, foundItems) => {
        res.render('list', {kindOfDay: day, newListItems: foundItems});
    });
    
});

// Add new item
app.post('/', (req, res) => {
    const itemName = req.body.newItem;
    Item.create({ name: itemName }, (err, newItem) => {
        if (!err) {
            console.log(`successfully save ${newItem.name}`);
            res.redirect('/');
        }
    });
});

// Delete item
app.post('/delete', (req, res) => {
    const deleteItemID = req.body.checkbox;
    Item.findByIdAndRemove(deleteItemID, (err) => {
        if (!err) {
            console.log('successfully delete');
            res.redirect('/');
        }
    })
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.listen(port, () => {
    console.log("Start listening");
    
});