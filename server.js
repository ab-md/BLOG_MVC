import express from "express";
import dotenv from "dotenv";
import { notFoundPage, serverError } from "./middlware/error.middlware.js";
import { allRoutes } from "./routes/index.route.js";
import connectDB from "./config/database.config.js";
import mongoose from "mongoose";
import expressEjsLayouts from "express-ejs-layouts";
import session from "express-session";
import flash from "connect-flash";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();
const port = process.env.PORT;

app.set("view engine", "ejs");
app.set("views", "./view");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false
}));
app.use(flash());
app.use(cookieParser());

app.use(expressEjsLayouts);
app.use(express.static("public"));

// app.use((req, res, next) => {
//     console.log("REQUEST:", req.method, req.originalUrl);
//     next();
// });
app.use(allRoutes);

app.use(notFoundPage);
// app.use(notFound);
app.use(serverError);

connectDB().then(() => {
    app.listen(port, err => console.log(err ? err.message : `server is running on http://localhost:${port}`));
});

process.on("SIGINT", async () => {
    await mongoose.connection.close();
    console.warn("MongoDB connection closed");
    process.exit(0);
});