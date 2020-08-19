const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(cors());

const users = [
  {
    name: 'Mehmet',
    surname: 'Baran',
    birthYear: '14.05.1987',
    birthCity: 63,
    phone: '3131311133',
    email: 'test1@gmail.com',
    id: Math.random(),
  },
  {
    name: 'Zerya Betül',
    surname: 'Baran',
    birthYear: '10.08.2017',
    birthCity: 34,
    phone: '12458688646',
    email: 'test@gmail.com',
    id: Math.random(),
  },
];

app.get('/', (req, res) => {
  res.send(users);
});

app.post('/users', (req, res) => {
  const newUser = {
    name: req.body.name,
    surname: req.body.surname,
    birthYear: req.body.birthYear,
    phone: req.body.phone,
    email: req.body.email,
    id: Math.random(),
    // createdAt: new Date().getTime(),
  };
  users.push(newUser);
  res.send(users);
  res.sendStatus(201);
});

app.put('/users', (req, res) => {
  const user = users.find(({ id }) => req.body.id == id);

  user.name = req.body.name;
  user.surname = req.body.surname;
  user.dateBirth = req.body.dateBirth;
  user.phone = req.body.phone;
  user.email = req.body.email;

  res.send(users);
  res.sendStatus(201);
});

app.delete('/users', (req, res) => {
  const todoToRemoveIndex = users.findIndex((user) => {
    return user.id == req.body.id;
  });

  users.splice(todoToRemoveIndex, 1);

  res.send({ success: true });
  res.sendStatus(201);
});

app.get('/users', (req, res) => {
  res.send(JSON.stringify(users));
});

app.listen(8800, () => {
  console.log('server is working');
});
