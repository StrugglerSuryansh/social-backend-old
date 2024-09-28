const express = require('express');
const router = express.Router();
const Content = require('../models/content');
const { generateAIContent } = require('../services/aiService');

router.post('/generate', async (req, res) => {
  try {
    const { prompt } = req.body; // Assuming the AI service needs a prompt from the request body
    const generatedContent = await generateAIContent(prompt);
    const content = new Content({ text: generatedContent });
    await content.save();
    res.json({ content: generatedContent });
  } catch (error) {
    res.status(500).json({ error: 'Error generating content' });
  }
});

module.exports = router;
