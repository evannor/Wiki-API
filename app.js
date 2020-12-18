const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');

const app = express();
mongoose.connect('mongodb://localhost:27017/wikiDB', {
  useNewUrlParser: true, 
  useUnifiedTopology: true
});

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

const Article = mongoose.model('Article', {
  title: String,
  content: String
});

app.listen(3000, function() {
  console.log("Server is running on port 3000");
});