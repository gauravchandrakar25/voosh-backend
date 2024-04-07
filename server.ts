import express, { Request, Response, Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const connectDb = require("./config/dbConnection");

//For env File
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

// Swagger configuration options
const options = {
  definition: {
    openapi: "3.0.0", // Specification (optional, defaults to swagger: '2.0')
    info: {
      title: "Voosh Backend Server", // Title (required)
      version: "1.0.0", // Version (required)
      description: "API documentation for Voosh assignment", // Description (optional)
    },
  },
  // Paths to the API docs
  apis: ["./route/user_route.ts"],
};

// Initialize Swagger-jsdoc
const specs = swaggerJsdoc(options);

// Serve Swagger UI at /api-docs endpoint
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

//db connection
connectDb();

//using the dependancies
app.use(cors());
app.use(express.json());
app.use("/", require("./route/user_route"));

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Voosh TypeScript Server");
});

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
