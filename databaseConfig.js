const mongoose = require('mongoose');
const connectDB=()=>{
  mongoose
      .connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log('Connected to MongoDB');
      })
      .catch((err) => {
        console.log(err);
      });
};
module.exports = connectDB;
