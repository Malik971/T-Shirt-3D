import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import dalleRoutes from "./routes/dalle.routes.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, ".env") });

console.log("OpenAI API Key:", process.env.OPENAI_API_KEY ? "OK" : "MISSING");

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: "10mb" }));

// Routes
app.use("/api/v1/dalle", dalleRoutes);
// app.use("/api/v1/stability", stabilityRoutes); 

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello Malik" });
});

// Suppression de la route de test redondante
app.listen(8080, () => console.log("Server is running on port 8080"));
