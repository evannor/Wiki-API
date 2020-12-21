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

const articleSchema = {
  title: String,
  content: String
}

const Article = mongoose.model('Article', articleSchema);

app.route("/articles")

.get(function (req, res) {
  Article.find(function (err, foundArticles) {
    if (!err) {
      res.send(foundArticles);
    } else {
      res.send(err);
    }
  });
})

.post(function(req, res) {

  const newArticle = new Article({
    title: req.body.title,
    content: req.body.content
  });

  newArticle.save(function(err) {
    if (!err) {
      res.send("Successfully added a new article");
    } else {
      res.send(err);
    }
  });
})

.delete(function(req, res) {
  Article.deleteMany(function(err,) {
    if(!err) {
      res.send('Successfully deleted all articles.');
    } else {
      res.send(err);
    }
  });
});

app.route("/articles/:postTitle").get(function(req, res) {
  Article.findOne({ title: req.params.postTitle }, function (err, article) {
    if(!err) {
      res.send(article);
    } else {
      res.send(err);
    }
  })
}).put(function(req, res) {
  Article.replaceOne(
    { title: req.params.postTitle },
    {title: req.body.title, content: req.body.content}, function(err, updateArticle) {
      if(!err) {
        res.send("Updated the article as requested.");
      } else {
        res.send(err);
      }
    })
}).delete();

app.listen(3000, function() {
  console.log("Server is running on port 3000");
});