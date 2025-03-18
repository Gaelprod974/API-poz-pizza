require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const clientRoutes = require('./routes/clientRoutes');
const commandeRoutes = require('./routes/commandeRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Connexion à MongoDB avec gestion des erreurs
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ Connecté à MongoDB'))
    .catch(err => {
        console.error('❌ Erreur MongoDB :', err);
        process.exit(1);
    });

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/clients', clientRoutes);
app.use('/api/commandes', commandeRoutes);

// Route de test
app.get('/', (req, res) => {
    res.send('API Poz-pizza fonctionnelle ! 🍕');
});

// Lancer le serveur
app.listen(PORT, () => console.log(`🚀 Serveur en écoute sur le port ${PORT}`))
    .on('error', (err) => {
        console.error(`❌ Erreur de démarrage du serveur : ${err.message}`);
        process.exit(1);
    });
