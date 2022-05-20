const express = require('express');
const cors = require("cors");
const app = express();

app.use(express.urlencoded({
    extended:true
  }));
//middleware
app.use(cors());
app.use(express.json());

// var mongo = require('mongodb');
// var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017/aboutmeapp";

// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   console.log("Database created!");
//   db.close();
// });


// var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017/";

// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   var dbo = db.db("aboutmeapp");
//   dbo.createCollection("skillsdata", function(err, res) {
//     if (err) throw err;
//     console.log("Collection created!");
//     db.close();
//   });
// });




var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("aboutmeapp");
  dbo.collection("skillsdata").findOne({}, function(err, result) {
    if (err) throw err;
    let respData = result.skillsData
    app.get('/skills-list', (req, res) => {
        res.send(respData);
      })
    db.close();
  });
});

app.post("/contact-us", (req, res) => {
  let tempReq = req.body;

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("aboutmeapp");
        var myobj = { tempReq };
        dbo.collection("userSentMessages").insertOne(myobj, function(err, res) {
          if (err) throw err;
          console.log(myobj,"1 document inserted");
          db.close();
        });
      });
});




var server = app.listen(3000, function () {  
    var host = server.address().address  
    var port = server.address().port  
    console.log("Example app listening at http://%s:%s", host, port)  
    
  })





