//require mongoose
const mongoose = require ('mongoose')

//connect to db
const connectDB = async () => {
try {
    await mongoose.connect(process.env.MONGO_URL,
        {useNewUrlParser: true,
        useUnifiedTopology: true})
        console.log('database is connected..')
} catch (error) {
    console.error(`connection to database failed!!! ${error}`)
}

}

module.exports = connectDB