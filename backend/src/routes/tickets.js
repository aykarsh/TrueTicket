const express = require('express');
const { buyTicket, resellTicket } = require('../utils/stacks');
const router = express.Router();

router.post('/buy', async (req, res) => {
  try {
    const { eventId, sender } = req.body;
    const response = await buyTicket(sender, eventId);
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/resell', async (req, res) => {
  try {
    const { eventId, ticketId, newPrice, sender, newBuyer } = req.body;
    const response = await resellTicket(sender, eventId, ticketId, newPrice, newBuyer);
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
