const express =require("express")
const server = express()
const mongoose = require("mongoose")
const registerroutes = require("./routes/registerroutes")
const loginroutes = require("./routes/loginroutes")
const userprofileroutes = require("./routes/userprofileroutes")
server.use(express.json())
server.use(express.urlencoded({extended:true}))


mongoose.connect('mongodb+srv://jeochirrakkal26:screl@cluster0.mrxhbny.mongodb.net/SCREL',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

    .then(() => {
        console.log('Database Connected')
    })
    .catch((err) => {
        console.log(err)
    })

    server.use('/api/register', registerroutes)
    server.use('/api/login', loginroutes)
    server.use('/api/user', userprofileroutes)







const port = 1000;
server.listen(port, () => {
    console.log(`Server Started on ${port}`)
})