const express = require('express');
const bodyParser = require('body-parser');
const amqp = require('amqplib');

const app = express();
const PORT = 5000;
const QUEUE = 'message_queue';

app.use(bodyParser.json());

app.post('/message', async (req, res) => {
  const { message } = req.body;

  try {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    await channel.assertQueue(QUEUE);
    channel.sendToQueue(QUEUE, Buffer.from(message));

    console.log(`Sent to queue: ${message}`);
    res.status(200).send('Message sent to queue');
  } catch (error) {
    res.status(500).send('Error sending message');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
