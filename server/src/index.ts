import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { serve, setup } from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import HeroesController from "./routes/heroes";
import { FileDatabase } from "./database";

dotenv.config();

const PORT = parseInt(process.env.PORT || "8000", 10);
const app = express();
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "DELETE"],
  })
);
app.use(express.json());

const heroes = new HeroesController(new FileDatabase());
app.use("/heroes", heroes.router);

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Hero API",
      version: "1.0.0",
      description: "A simple API for Heroes",
    },
  },
  apis: ["**/routes/*.*"],
};
app.use("/", serve, setup(swaggerJsDoc(options)));

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
