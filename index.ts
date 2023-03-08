import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import * as bodyparser from "body-parser";
import route from "./routes";
dotenv.config();
const app: Express = express();
app.use(cors());
app.use(bodyparser.json());

app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.listen(8000);
app.get("/", (req, res) => {
  res.send("hello");
});
app.use("/", route);
