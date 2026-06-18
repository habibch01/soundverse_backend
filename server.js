const express   = require('express');
const mongoose  = require('mongoose');
const cors      = require('cors');
require('dotenv').config();

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173', credentials: true }));
app.use(express.json());

mongoose.set('strictQuery', false);

const mongoUris = [
  process.env.MONGODB_URI,
  'mongodb://127.0.0.1:27017/soundverse'
].filter(Boolean);

const connectMongo = async () => {
  for (const uri of mongoUris) {
    try {
      await mongoose.connect(uri, {
        serverSelectionTimeoutMS: 5000,
        connectTimeoutMS: 10000
      });
      console.log('✅ MongoDB connected to', uri);
      return;
    } catch (err) {
      console.error(`❌ MongoDB connection failed for ${uri}:`, err.message || err);
    }
  }

  console.error('❌ MongoDB failed to connect to all configured URIs.');
  process.exit(1);
};

app.use('/api/products', require('./routes/products'));
app.use('/api/orders',   require('./routes/orders'));
app.use('/api/users',    require('./routes/users'));

app.get('/', (req, res) => res.json({ message: '🎧 SoundVerse API is running!' }));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message || 'Internal Server Error' });
});

const PORT = process.env.PORT || 5000;

connectMongo()
  .then(() => {
    app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
  })
  .catch(err => {
    console.error('Failed to start server due to MongoDB connection error:', err);
    process.exit(1);
  });