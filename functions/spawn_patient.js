const sqlite3 = require('sqlite3').verbose();
const express = require("express");
const bodyParser = require("body-parser");

const app = express();


// open database in memory
let db = new sqlite3.Database(':memory:', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the in-memory SQlite database.');
});

// close the database connection
db.close((err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Close the database connection.');
});
//////////////////////////////////////////////




app.use(express.urlencoded());
app.use(express.json());

app.post('/register',(req, res) => {
    console.log(req.body.user_name)
    const user = {
        user_name : req.body.user_name,
        email : req.body.email,
        dob : req.body.dob,
        isdoctor : req.body.isdoctor,
        password : req.body.password
    }
    db.collection('users').doc(req.body.user_name).set(user)
    res.end('yes');

    });

app.listen(3000,() => {
console.log("Started on PORT 3000");
})

/*
const func1 = async () => {
    const susan_info = await db.collection('users').doc('susan').get()

    console.log(susan_info.data())


}
func1()
return
/*
db.collection('users').doc('susan').collection('info').doc('info')
.onSnapshot(snapshot => (
    console.log(snapshot)
))

*/