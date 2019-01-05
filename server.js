/*
SETTING UP THIS APP
npm install express --save
npm install hbs --save
*/
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const serverPort = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
//middleware (app.use)
app.use((req, res, next) => {
    var now  = new Date().toString();
    var log = `${now} ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err) {
            console.log('Unable to append to the log file.');
        }
    });
    next(); 
});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });

//make files in public abailable for serving
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    //res.send('<h3>Exress is running...</h3>');
    //res.send({name: 'Jeff' ,likes: ['Bible Prophecy' ,'Working out'] });
    res.render('home.hbs', {
        pageTitle: 'Home page',
        welcomeMsg: 'Welcome Home Visitor !',
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About page',
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMsg: 'There has been an error !'
    });
});

app.listen(serverPort, () => {
    console.log(`Server is up on port : ${serverPort}`);
});
