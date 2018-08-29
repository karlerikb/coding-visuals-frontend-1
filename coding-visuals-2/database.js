const firebase = require('firebase/app'); require('firebase/database');
const config = require("./config/config.js");
const fs = require("fs");
firebase.initializeApp(config);

const database = firebase.database().ref("courses");

database.once('value').then(function(snapshot) {
    dbObj = snapshot.val();
    dbString = JSON.stringify(dbObj);
    fs.writeFileSync("db.json", dbString);
    console.log("finished");
});