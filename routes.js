// routes.js
const express = require('express');

const router = express.Router();

const { items }= require('./fakeDb');

// GET route to retrieve the shopping list
router.get('/', (req, res) => {
    res.json(items.map(item => ({ name: item.name, price: item.price })));
});

router.get('/:name', (req, res) => {
    const item = items.find(item => item.name === req.params.name);
    if (item === undefined) {
        throw new Error('Not Found');
    }
    res.json(item);
});

// PATCH route to update an item in the shopping list
router.patch('/:name', (req, res) => {
    const itemName = req.params.name;
    const foundIndex = items.findIndex(item => item.name === itemName);
  
    if (foundIndex !== -1) {
      // Update the item's properties if they are provided in the request body
      if (req.body.name) {
        items[foundIndex].name = req.body.name;
      }
      if (req.body.price) {
        items[foundIndex].price = req.body.price;
      }
  
      res.json({ updated: items[foundIndex] });
    } else {
      res.status(404).json({ error: 'Item not found' });
    }
  });

// DELETE route to remove an item from the shopping list
router.delete('/:name', (req, res) => {
  const itemName = req.params.name;
  const foundIndex = items.findIndex(item => item.name === itemName);

  if (foundIndex !== -1) {
    items.splice(foundIndex, 1);
    res.json({ message: 'Deleted' });
  } else {
    res.status(404).json({ error: 'Item not found' });
  }
});

// POST route to add an item to the shopping list
router.post('/', (req, res) => {
  const newItem = req.body;
  items.push(newItem);
  res.status(201).json(newItem);
});

module.exports = router;
