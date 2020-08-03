const express = require('express');
const bodyParser = require('body-parser');
const date = require(__dirname + '/date.js');

const app = express();

const items = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

app.get('/', (req, res) => {
    let day = date();
    res.render('list', {kindOfDay: day, newListItems: items});
});

app.post('/', (req, res) => {
    let item = req.body.newItem;
    items.push(item);
    res.redirect('/');
})

app.get('/about', (req, res) => {
    res.render('about');
})

app.listen(3000, () => {
    console.log("Start listening on port 3000");
    
});