const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to mongodb succfull");
}).catch((e) => {
    console.log("Error no connection ************");
    console.log(e);
});

//to prevebt deprecation warnings (from mongo db native driver )

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

module.exports = {
    mongoose
};