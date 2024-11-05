const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3002;

app.use(bodyParser.json());

app.post('/message', async (req, res) => {
  const { message } = req.body;

  try {
    await axios.post('http://localhost:4000/message-receive', { message });
    res.status(200).send(`Message sent ${message}`);
  } catch (error) {
    res.status(500).send('Error sending message');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
