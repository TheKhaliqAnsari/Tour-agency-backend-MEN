const mongoose = require('mongoose')
const dotenv = require('dotenv');
dotenv.config({path: './.env'});
const app = require('./app');
const port = process.env.PORT;


const dbUrl = process.env.DB_URL.replace('<password>', process.env.DB_PASSWORD);

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then((connection) => {
    console.log("Connected To MongoDB Successfully")
})



// Umrah tour
// const umrahTour = new Tour({
//     name: "Saudi Umrah tour",
//     rating: 5.0,
//     price: 200000
// })

// umrahTour.save().then((doc) => {
//     console.log(doc);
//     umrahTour.save()
// }).catch(e => {
//     console.log("Error", e);
// })
// console.log(app.get('my'  + 'env'));

app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});
  