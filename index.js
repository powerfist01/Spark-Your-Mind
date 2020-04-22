var express = require('express')
var ejs = require('ejs')
var path = require('path')
var app = express()

app.set('view engine','ejs');
app.set('views', path.join(__dirname,'views'))
app.use('/public',express.static(__dirname + '/public'))


app.get('/',function(req,res){
    res.render('index')
})
app.get('/addQuestion',function(req,res){
    res.render('addquestion')
})

app.listen(3000,function(err){
    if(err)
        console.log('Error in starting the server')
    console.log('Server running on http://localhost:3000')
})