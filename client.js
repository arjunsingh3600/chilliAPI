var express = require('express');


var app = express();
app.use(express.json());
app.use(express.static('public'))

app.get('/', function(req, res) {
    console.log('request recieved')
    res.sendFile('./index.html', {root: __dirname })
});


app.listen(3000, () => {
    console.log('listening on port 3000');
  });
  