const express = require('express');
const app = express();

const { Client } = require('pg');

const connectionString = 'postgresql://postgres:secret@localhost:5432/homework';
const client = new Client({ connectionString });

client.connect();

app.get('/do-something', (request, response) => {
  console.log(`I'll do something, I promise!`);
  response.end();
});

app.get('/houses/:id', (request, response) => {
  const houseId = request.params.id;

  client.query(
    'SELECT * FROM houses WHERE id = $1',
    [houseId],
    (error, result) => {
      if (error) {
        // HTTP 500 = Internal Server Error
        response.status(500).send({
          message: 'Something went wrong with Postgres!',
          details: error.message
        });
      } else {
        response.send(result.rows[0]);
      }
    }
  );
});

app.listen(4001, () => console.log('Express API listening on port 4001'));
