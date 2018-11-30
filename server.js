var express = require("express");
var session = require("express-session");
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/static'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(session({
  secret: 'keyboardkitteh',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000}
}))

app.get('/', function (request, response){
  response.render('index');
})

app.post('/process', function (request,response){
  request.session.name = request.body.name;
  request.session.location = request.body.location;
  request.session.language = request.body.language;
  request.session.comment = request.body.comment;
  response.redirect('/result')
})

app.get('/result', function (request,response){
  var data = [
    {name: request.session.name,
    location: request.session.location,
    language: request.session.language,
    comment: request.session.comment
  }];

  response.render('submitInfo',{data: data});
})

app.listen(8000, function(){
  console.log("Listening on port 8000")
})
