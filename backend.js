const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const app = express();


app.use("/",router);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

router.get('/',(req, res) => {
res.sendfile("index.html");
});

app.listen(3000,() => {
console.log("Started on PORT 3000");
})