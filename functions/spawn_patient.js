const {auth, db} = require("./firebase");

const susan = {
    firstName : "Susan",
    lastName : "Smith",
    email : "susan@gmail.com",
    isDoctor : false,
    doctor : "james",
    age : 100
}
db.collection('users').doc('susan').collection('info').doc('info').set(susan)

db.collection('users')
.onSnapshot(snapshot => ( 
    console.log(snapshot)
))

