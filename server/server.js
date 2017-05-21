'use strict';

var loopback = require('loopback');
var boot = require('loopback-boot');

var app = module.exports = loopback();

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

app.get('/makecats', function(req, res) {
 
   var getRandomInt = function(min, max) {
     return Math.floor(Math.random() * (max - min + 1)) + min;
   }
 
   function randomName() {
     var initialParts = ["Fluffy","Scruffy","King","Queen","Emperor","Lord","Hairy","Smelly","Most Exalted Knight","Crazy","Silly","Dumb","Brave","Sir","Fatty"];
     var lastParts = ["Sam","Smoe","Elvira","Jacob","Lynn","Fufflepants the III","Squarehead","Redshirt","Titan","Kitten Zombie","Dumpster Fire","Butterfly Wings","Unicorn Rider"];
     return initialParts[getRandomInt(0, initialParts.length-1)] + ' ' + lastParts[getRandomInt(0, lastParts.length-1)]
   };
 
   function randomColor() {
     var colors = ["Red","Blue","Green","Yellow","Rainbow","White","Black","Invisible"];
     return colors[getRandomInt(0, colors.length-1)];
   }
 
   function randomGender() {
     var genders = ["Male","Female"];
     return genders[getRandomInt(0, genders.length-1)];
   }
 
   function randomAge() {
     return getRandomInt(1, 15);
   }
 
   function randomBreed() {
     var breeds = ["American Shorthair","Abyssinian","American Curl","American Wirehair","Bengal","Chartreux","Devon Rex","Maine Coon","Manx","Persian","Siamese"];
     return breeds[getRandomInt(0, breeds.length-1)];
   }
 
   //make 25 cats
   for(var i=0;i<25;i++) {
     var cat = {
       name:randomName(),
       color:randomColor(),
       gender:randomGender(),
       age:randomAge(),
       breed:randomBreed()
   }
 
     app.models.Cat.upsert(cat);
   } // for
 
   res.send('Making cats - stand back!');
});


// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});
