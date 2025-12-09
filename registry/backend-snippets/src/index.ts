import dotenv from 'dotenv'
import { app } from './app'

dotenv.config({
  path: './env'
})

const port = process.env.PORT || 3000;

app.on('error', (error) => {
  console.log('Error :', error);
  throw error;
});

app.listen(port, () => {
  console.log(`Server is running at port: ${port}`);
});

// ALways start the server after connecting the db like in the example provided below -

// connectDB()
// .then(() => {
//   app.on("error", (error) => {
//     console.log("Error :", error);
//     throw error;
//   });

//   app.listen(process.env.PORT || 3000, () => {
//     console.log(`Server is running at port: ${process.env.PORT}`);
//   });
// })
// .catch((error) => {
//   console.log("MongoDB connection failed !! E:", error);
// })