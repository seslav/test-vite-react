const express = require('express');
const app = express();
app.use(express.json());

const mockUser = {
  username: 'user',
  password: 'password123',
  token: 'mock-token-123456',
};

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username === mockUser.username && password === mockUser.password) {
    return res.status(200).send({ token: mockUser.token });
  } else {
    return res.status(401).send({ message: 'Invalid username or password' });
  }
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});