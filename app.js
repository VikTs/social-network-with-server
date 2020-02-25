const express = require('express')
const config = require('config')
const mongoose = require('mongoose')

const app = express()
// app.use(function (req, res, next) {
//     console.log('Time:', Date.now());
//     next();
//   });

app.use(express.json({ extended: true }))
app.use('/api/auth', require('./routes/auth.routes')) // import router from auth.routes

const PORT = config.get('port') || 5000 //порт сервера

async function start() {
    try {

        await mongoose.connect(config.get('mongoUrl'), { //connect to MongoDB
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        // const connection = mongoose.connection;
        // connection.once('open', function() {
        //     console.log("MongoDB database connection established successfully");
        // })

        app.listen(PORT, () => { console.log(`App started on port ${PORT}`) }) //load server

    } catch (e) { // if no connect
        console.log('Server error')
        process.exit()
    }

}
start()
