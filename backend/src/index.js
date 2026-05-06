require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./db/models');

const app = express();

app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:3000', credentials: true }));
app.use(express.json());

app.get('/health', (_, res) => res.json({ status: 'ok' }));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/tasks', require('./routes/tasks'));

app.use((_, res) => res.status(404).json({ message: 'Not found' }));
app.use((err, _, res, __) => res.status(500).json({ message: err.message }));

const PORT = process.env.PORT || 5001;

const start = async () => {
  await sequelize.authenticate();
  await sequelize.sync({ alter: true });
  app.listen(PORT, () => console.log(`🚀 Backend: http://localhost:${PORT}`));
};

if (require.main === module) start().catch(console.error);

module.exports = app;
