var express = require('express')
var ejs = require('ejs')
var mongoose = require('mongoose')
var path = require('path')
var bodyParser = require('body-parser')
var app = express()

//Using mongoose to connect to MongoDB database
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://powerfist01:love4you@ds219095.mlab.com:19095/trivia', { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;
db.once('open', function () {
    console.log('Connected to database!');
})
db.on('error', function (err) {
    console.log('Error to connect to database!!')
    throw err;
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var Schema = mongoose.Schema;
const question = new Schema({
    tag: String,
    questions: Array
});
var qModel = mongoose.model('Question', question);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))
app.use('/public', express.static(__dirname + '/public'))


app.get('/', function (req, res) {
    res.render('index')
})
app.get('/addQuestion', function (req, res) {
    res.render('addquestion')
})
app.post('/addQuestion', function (req, res) {
    console.log(req.body);
    var tag = req.body.tag;
    var ques = {
        question: req.body.question,
        answer: req.body.answer
    }
    qModel.find({ tag: tag }, function (err, doc) {
        if (err)
            console.log('Error in getting the document');

        if (doc.length) {
            qModel.updateOne({ tag: tag }, { $push: { questions: ques } },function(err){
                if(err)
                    throw err;
                console.log('Saved in array!')
            });
        } else {
            var data = new qModel({
                tag: tag,
                questions: [ques]
            })
            data.save(function (err) {
                if (err)
                    console.log('Error in saving!')
                console.log('Question saved!');
            })
        }
    })
    res.render('addquestion')
})

app.listen(3000, function (err) {
    if (err)
        console.log('Error in starting the server')
    console.log('Server running on http://localhost:3000')
})