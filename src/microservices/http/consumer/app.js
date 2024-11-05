const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 4000;

app.use(bodyParser.json());

app.post('/message-receive', (req, res) => {
  const { message } = req.body;
  console.log('Received message:', message);
  res.status(200).send('Message received');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
