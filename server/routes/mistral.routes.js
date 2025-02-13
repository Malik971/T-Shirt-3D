import express from "express";
import * as dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const router = express.Router();

router.route('/').get((req, res) => {
  res.status(200).json({ message: "Hello Malik from Mistral AI" });
});

router.route('/').post(async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Le prompt est requis" });
    }

    console.log("Requête reçue avec prompt:", prompt);

    const response = await axios.post(
      'https://api.mistral.ai/v1/generate',
      {
        model: "pixtral-12b",
        messages: [
          {
            role: "user",
            content: [
              { type: "text", text: prompt },
            ],
          },
        ],
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.MISTRAL_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const imageUrl = response.data.choices[0].message.content[0].image_url;
    res.status(200).json({ photo: imageUrl });

  } catch (error) {
    console.error("Erreur Mistral:", error.response ? error.response.data : error.message);
    res.status(500).json({ message: "Erreur interne du serveur", error: error.message });
  }
});

export default router;
