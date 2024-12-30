const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
const port = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Database setup
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'
});

const Task = sequelize.define('Task', {
  description: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

// Sync database
sequelize.sync();

// Routes
app.get('/tasks', async (req, res) => {
  const tasks = await Task.findAll();
  res.json(tasks);
});

app.post('/tasks', async (req, res) => {
  const { description } = req.body;
  const newTask = await Task.create({ description });
  res.json(newTask);
});

app.delete('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  await Task.destroy({ where: { id } });
  res.sendStatus(204);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
