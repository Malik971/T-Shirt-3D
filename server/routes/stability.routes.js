import express from "express";
import axios from "axios";
import FormData from "form-data";

const router = express.Router();

router.post("/", async (req, res) => {
    console.log("Données reçues :", req.body);
  try {
    const { prompt } = req.body;
    console.log("Données reçues du frontend :", req.body);

    // Vérifie si le prompt est présent
    if (!prompt) {
      return res.status(400).json({ error: "Le prompt est requis" });
    }

    console.log(`Envoi de la requête à Stability AI avec le prompt : ${prompt}`);

    // Création du form-data
    const form = new FormData();
    form.append("prompt", prompt);
    form.append("output_format", "png"); // Assure-toi que ce paramètre est accepté

    // Envoie la requête à Stability AI
    const response = await axios.post(
      "https://api.stability.ai/v2beta/stable-image/generate/sd3", // Vérifie que c'est la bonne URL
      form,
      {
        headers: {
          ...form.getHeaders(),
          Authorization: `Bearer ${process.env.STABILITY_API_KEY}`,
        },
      }
    );

    console.log("Réponse Stability AI reçue :", response.data);

    // Envoie l'image générée au frontend
    res.status(200).json({ image: response.data });
  } catch (error) {
    console.error("Erreur Stability AI:", error.response?.data || error.message);
    res.status(500).json({ message: "Erreur interne du serveur", error: error.message });
  }
});

export default router;
