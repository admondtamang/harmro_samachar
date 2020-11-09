import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import postRoutes from "./routes/posts.js";
import morgan from "morgan";
import path from "path";

// Middleware
const app = express();
dotenv.config();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.options("*", cors());
app.use(morgan("tiny"));
const __dirname = path.resolve();
// app.use(express.static(__dirname + "/frontend/build"));
app.use(express.static(__dirname + "/public"));

// Routes
app.use("/posts", postRoutes);

const PORT = process.env.PORT || 30040;

mongoose
  .connect(process.env.URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server Running on Port: http://localhost:${PORT}`)
    )
  )
  .catch((error) => console.log(`${error} did not connect`));
