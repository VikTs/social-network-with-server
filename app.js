const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const app = express();
//mongoose.set('useFindAndModify', false);

const multer  = require("multer"); 
 
const storageConfig = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, "uploads");
    },
    filename: (req, file, cb) =>{
        cb(null, file.originalname);
    }
});
app.use(express.static('https://www.publicdomainpictures.net/pictures/270000/nahled/avatar-people-person-business-u.jpg'));
app.use(multer({storage:storageConfig}).single("filedata"));
app.put("/photo", function (req, res, next) {
   
    let filedata = req.file;
    if(!filedata)
        res.send("Ошибка при загрузке файла");
    else
        res.send("Файл загружен");
});



app.use(express.json({ extended: true }))
app.use('/api/auth', require('./routes/auth.routes')) // import router from auth.routes
app.use('/api/profile', require('./routes/profile.routes')) 
app.use('/api/users', require('./routes/users.routes')) 

const PORT = config.get('port') || 5000 //порт сервера

async function start() {
    try {

        await mongoose.connect(config.get('mongoUrl'), { //connect to MongoDB
            useNewUrlParser: true,
            useUnifiedTopology: true
        })


        const connection = mongoose.connection;
        connection.once('open', function() {
            console.log("MongoDB database connection established successfully");
        })


       // mongoose.connection.close()



        app.listen(PORT, () => { console.log(`App started on port ${PORT}`) }) //load server

    } catch (e) { // if no connect
        console.log('Server error. Mongo is not connected')
        process.exit()
    }

}
start()
