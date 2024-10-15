const express = require("express")
const app = express()
const mongoose = require("mongoose")
const Item = require("./models/items")

const apiRoutes = require('./routes/api');
const cors = require("cors")
const dotenv = require("dotenv").config()
app.use(cors())
app.use(express.json());

const PORT = process.env.PORT;
const CONN_STRING = process.env.CONNECTION_STRING


mongoose.connect(CONN_STRING).then(() => {
    console.log("Connected to Database");
}).catch(error => {
    console.log("Error connecting to Database", error);

})


app.get('/', (req, res) => {
    res.send("Server is running");
})

app.use('/api', apiRoutes);


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);

})