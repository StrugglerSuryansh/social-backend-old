const express = require('express');
const router = express.Router();
const Content = require('../models/content');
const { generateAIContent } = require("../services/aiservices");

router.post('/generate', async (req, res) => {
  try {
    const { prompt } = req.body;

    // Validate that prompt exists
    if (!prompt || typeof prompt !== 'string') {
      return res.status(400).json({ error: 'Prompt is required and must be a string' });
    }

    // Generate content using the AI service
    const generatedContent = await generateAIContent(prompt);

    // Check if generatedContent is valid (non-empty, string)
    if (!generatedContent || typeof generatedContent !== 'string') {
      return res.status(500).json({ error: 'AI service returned invalid content' });
    }

    // Create a new Content object
    const content = new Content({ 
      text: generatedContent, 
      createdAt: new Date() // Set other fields if needed
    });

    // Save to the database
    await content.save();

    // Return the generated content
    res.json({ content: generatedContent });
    
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ error: 'Error generating content' });
  }
});

module.exports = router;
