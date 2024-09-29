const express = require('express');
const app = express();
const port = 3000;

// GET /hello route
app.get('/hello', (req, res) => {
  res.send('Hello Express JS');
});

// GET /user route with query parameters
app.get('/user', (req, res) => {
  const firstname = req.query.firstname || 'Pritesh';
  const lastname = req.query.lastname || 'Patel';
  res.json({ firstname, lastname });
});

// POST /user/:firstname/:lastname route with path parameters
app.post('/user/:firstname/:lastname', (req, res) => {
  const { firstname, lastname } = req.params;
  res.json({ firstname, lastname });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
