const express = require("express");
const cors = require("cors");
const { petDb, postDb } = require('./config/db');
const setupSwagger = require("./swagger");
const postRoutes = require("./routes/postRoutes");

const app = express();
app.use(cors());
app.use(express.json());

setupSwagger(app);

app.use("/posts/update", postRoutes);
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Service is healthy' });
});

const PORT = process.env.PORT || 4002;

async function startServer() {
  try {
    // Authenticate connection with the posts database
    await postDb.authenticate();
    console.log("Pet Database connected.");

    // Authenticate connection with the pet database
    await postDb.authenticate();
    console.log("Post Database connected.");

    // Sync pet models with the pet database
    await petDb.sync();
    console.log("Pet Database synchronized with models.");

    // Start the Express server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (err) {
    console.error("Error connecting to the databases or syncing models:");
    console.error(err);
    process.exit(1); 
  }
}

startServer();