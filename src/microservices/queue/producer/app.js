const express = require('express');
const amqp = require('amqplib');

const app = express();
const PORT = 6000;
const QUEUE = 'message_queue';

app.post('/queue-establish', async (req, res) => {
  try {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    await channel.assertQueue(QUEUE);

    console.log('Waiting for messages in queue...');

    channel.consume(QUEUE, (msg) => {
      if (msg !== null) {
        const message = msg.content.toString();
        console.log('Received message from queue:', message);
        channel.ack(msg);
      }
    });

    res.status(200).send('Listening to the queue');
  } catch (error) {
    res.status(500).send('Error establishing queue');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
