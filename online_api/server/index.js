const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require('cors');
const db = require('./models');
require('dotenv').config();

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routers
app.use('/api/v1/auth', require('./routes/auth'));
app.use('/api/v1/rooms', require('./routes/rooms'));
app.use('/api/v1/comments', require('./routes/comments'));
app.use('/api/v1/reports', require('./routes/reports'));
app.use('/api/v1/search', require('./routes/search'));
app.use('/api/v1/push', require('./routes/push'));
app.use('/api/v1/conversations', require('./routes/conversations'));
app.use('/api/v1/notifications', require('./routes/notifications'));
app.use('/api/v1/scores', require('./routes/scores'));

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`);
  });
});
