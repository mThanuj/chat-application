import { app } from "./app.js";
import connectDB from "./db/index.js";
import { PORT } from "./constants.js";

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(`MongoDB Connection error: ${err}`);
  });
