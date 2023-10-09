const express = require('express');
const cors = require('cors');
const app = express();
const openai = require('openai');
const port = 3001;

// Set your OpenAI API key
openai.apiKey = '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';

// Enable CORS for all routes
app.use(cors());
app.use(express.json());

app.post('/chat', async (req, res) => {
  const prompt = req.body.prompt;

  try {
    const response = await openai.Completion.create({
      engine: 'text-davinci-002',
      prompt: prompt,
      max_tokens: 50,
      n: 1,
      stop: null,
      temperature: 0.5,
    });

    res.json({ text: response.choices[0].text });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while processing your request.' });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
