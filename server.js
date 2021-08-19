const { response } = require('express');
var express = require('express');


var app = express();

app.use(express.json());
app.use(express.static('public'))


var chillies =[
    {
        id:'1',
        name: 'jalapeno'
    },
    {
        id:'2',
        name: 'ancho'
    },
    {
        id:'3',
        name: 'bhoot'
    }   
    
];



app.get('/', function(req, res) {
    res.sendFile('./index.html', {root: __dirname })
});



app.get('/chillies',(req,res)=>{

    res.send(chillies);

    console.log('get all chillies');

});


app.get('/chillies/:id',(req,res)=>{


    chillies.forEach(c => {

        if (c.id==req.params.id){
            res.send(c); 
        }
    });


   
    console.log(`get a chilli with id ${req.params.id}`);

});


app.post('/chillies',(req,res)=>{
    


    const newChilli = { ...req.body, id:chillies.length + 1};

    

    chillies.push(newChilli);
    
    res.send(newChilli);
    console.log(req.body);

   console.log('add a chilli');

});


app.put('/chillies/:id',(req,res)=>{


    chillies = chillies.map ( c => {

        if (c.id == req.params.id){
            console.log(`update a chilli with id ${req.params.id}`);
           
           return req.body;
           res.send(c);


        }else{
            return c;
            
        }

    });

   
    
    
});

app.delete('/chillies/:id',(req,res)=>{


    let deletedChilli = chillies.find(c => c.id == req.params.id);

    chillies = chillies.filter ( c => c.id != req.params.id );
    
    res.send(deletedChilli);

    console.log(`delete a chilli with id ${req.params.id}`);
    
});


app.listen(3001, () => {
    console.log('listening on port 3001');
  });
