import mongoose from "mongoose";

export default function MongoDb(url) {
  const dbconnection = async () => {
    await mongoose.connect(url);
  };

  dbconnection()
    .then(() => {
      console.log("database connection set successfully!");
    })
    .catch((err) => {
      console.log(err.message);
    });
}
