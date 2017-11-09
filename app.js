const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const movie = require('./routes/movie');
const cast = require('./routes/cast');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/public')))

app.get('/', function(req,res) {
  res.render('index');
});

app.use('/movies', movie);
app.use('/casts', cast);

app.listen(process.env.PORT || 3000, function() {
  console.log(`Are you looking for me? If local, I'm running on 3000`);
})
