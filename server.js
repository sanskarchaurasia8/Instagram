require("node:dns/promises").setServers(["1.1.1.1", "8.8.8.8"]);
require('dotenv').config()
const app = require("./src/app")
const connectToDatabase = require('./src/config/database')




app.listen(3000, ()=>(
    console.log('Server is running on port 3000')
    
))

connectToDatabase();