import express from "express";
import * as dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.route("/").get((req, res) => {
  res.status(200).json({ message: "Hello Malik from OpenAI" });
});

router.route("/").post(async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Le prompt est requis" });
    }

    console.log("Requête reçue avec prompt:", prompt);

    const response = await openai.images.generate({
      model: "dall-e-2",
      prompt,
      n: 1,
      size: "1024x1024",
      response_format: "b64_json",
    });

    // Extraction des headers de rate limit
    const headers = response.headers;
    console.log("Rate Limit Headers:", headers);

    console.log("Réponse OpenAI reçue:", response);

    if (!response.data || !response.data[0] || !response.data[0].b64_json) {
      console.error("Erreur : L'API OpenAI n'a pas renvoyé d'image.");
      return res.status(500).json({ error: "Aucune image générée" });
    }

    const image = response.data[0].b64_json;
    res.status(200).json({ photo: `data:image/png;base64,${image}` });
  } catch (error) {
    console.error(
      "Erreur OpenAI:",
      error.response ? error.response.data : error.message
    );
    res
      .status(500)
      .json({ message: "Erreur interne du serveur", error: error.message });
  }
});

export default router;
