const express = require('express');
const fs = require('fs'); // To read user.json file
const path = require('path');
const app = express();
const router = express.Router();

// Middleware to parse JSON body
app.use(express.json());

/*
- Serve home.html with a welcome message
*/
router.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, 'home.html'));
});

/*
- Return all details from user.json file as JSON
*/
router.get('/profile', (req, res) => {
  fs.readFile(path.join(__dirname, 'user.json'), 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Error reading user file' });
    }
    try {
      const users = JSON.parse(data);
      res.json(users); // Send the parsed JSON data
    } catch (parseError) {
      res.status(500).json({ message: 'Error parsing JSON data' });
    }
  });
});

/*
- Handle login logic with validation from user.json file
*/
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  fs.readFile(path.join(__dirname, 'user.json'), 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Error reading user file' });
    }

    try {
      const users = JSON.parse(data); // Parsing the user.json file
      const user = users.find(u => u.username === username);

      if (!user) {
        return res.json({ status: false, message: 'User Name is invalid' });
      }

      if (user.password !== password) {
        return res.json({ status: false, message: 'Password is invalid' });
      }

      res.json({ status: true, message: 'User is valid' });
    } catch (parseError) {
      console.error(parseError); // Log the actual error
      res.status(500).json({ message: 'Error parsing user data' });
    }
  });
});


/*
- Logout route accepting username and returning an HTML message
*/
router.get('/logout/:username', (req, res) => {
  const { username } = req.params;
  res.send(`<b>${username} successfully logged out.</b>`);
});

/*
- Error handling middleware for server errors
*/
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('<h1>Server Error</h1>');
});

app.use('/', router);

// Start the server on port 8081
app.listen(8081, () => {
  console.log('Web Server is listening at port 8081');
});
