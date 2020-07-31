var express = require('express');
var bodyParser = require('body-parser')
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mongoose = require('mongoose');
require('./models/slider');

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected successfully to DB')
});

var Slider = mongoose.model('Slider')

app.get('/slider', (req, res) => {
  Slider.find({},(err, slider)=> {
    res.send(slider);
  })
})

app.post('/slider', (req, res) => {
  var slider = new Slider(req.body);
  slider.save((err) =>{
    if(err)
      sendStatus(500);
    io.emit('slider', req.body);
    res.sendStatus(200);
  })
})

io.on('connection', socket =>{
  console.log('a user is connected')
  socket.on('slider', e => {
    io.emit('slider', e)
  })
})

var server = http.listen(process.env.PORT || 9000, () => {
  console.log('server is running on port', server.address().port);
});