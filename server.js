// DEPENDENCIES
const express = require('express');
const path = require('path');
const dbData = require('./db/db.json');
const { v4: uuidv4 } = require("uuid");

// EXPRESS CONFIGURATION
const app = express();

// Sets port
const PORT = process.env.PORT || 3030;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Basic route that sends the user first to the AJAX Page
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'public/notes.html')));

app.get('/api/notes', (req, res) => res.json(dbData));

app.post('/api/notes', (req, res) => {
    let newData = req.body;
    newData.id = uuidv4();
    dbData.push(newData);
    res.json(true);
  });

  

  app.delete('/api/notes/:id', (req, res) => {
    dbData.forEach((item,index) =>{
        if(item.id === req.params.id)  
        {
            dbData.splice(index,1);
            res.json(true);
        }
    })
    
  });

app.listen(PORT, () => console.log(`https://www.localhost:${PORT}`));
