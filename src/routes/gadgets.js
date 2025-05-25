const express = require('express');
const router = express.Router();
const { body, query, validationResult } = require('express-validator');
const { auth, adminAuth } = require('../middleware/auth');
const Gadget = require('../models/Gadget');

// Get all gadgets
router.get('/',
  auth,
  query('status').optional().isIn(['Available', 'Deployed', 'Destroyed', 'Decommissioned']),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const where = {};
      if (req.query.status) {
        where.status = req.query.status;
      }

      const gadgets = await Gadget.findAll({ where });
      
      const gadgetsWithProbability = gadgets.map(gadget => ({
        ...gadget.toJSON(),
        missionSuccessProbability: gadget.calculateMissionSuccessProbability()
      }));

      res.json(gadgetsWithProbability);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  }
);

// Create new gadget
router.post('/',
  auth,
  adminAuth,
  [
    body('name').trim().notEmpty()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { name } = req.body;
      const codename = Gadget.generateCodename();

      const gadget = await Gadget.create({
        name,
        codename
      });

      res.status(201).json(gadget);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  }
);

// Update gadget
router.patch('/:id',
  auth,
  adminAuth,
  [
    body('name').optional().trim().notEmpty(),
    body('status').optional().isIn(['Available', 'Deployed', 'Destroyed', 'Decommissioned'])
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const gadget = await Gadget.findByPk(req.params.id);
      if (!gadget) {
        return res.status(404).json({ error: 'Gadget not found' });
      }

      await gadget.update(req.body);
      res.json(gadget);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  }
);

// Decommission gadget
router.delete('/:id',
  auth,
  adminAuth,
  async (req, res) => {
    try {
      const gadget = await Gadget.findByPk(req.params.id);
      if (!gadget) {
        return res.status(404).json({ error: 'Gadget not found' });
      }

      await gadget.update({
        status: 'Decommissioned',
        decommissionedAt: new Date()
      });

      res.json({ message: 'Gadget decommissioned successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  }
);

// Self-destruct sequence
router.post('/:id/self-destruct',
  auth,
  adminAuth,
  async (req, res) => {
    try {
      const gadget = await Gadget.findByPk(req.params.id);
      if (!gadget) {
        return res.status(404).json({ error: 'Gadget not found' });
      }

      if (gadget.status === 'Destroyed') {
        return res.status(400).json({ error: 'Gadget is already destroyed' });
      }

      const confirmationCode = Gadget.generateSelfDestructCode();
      
      // In a real application, you would send this code to the user
      // For this demo, we'll just return it in the response
      await gadget.update({ status: 'Destroyed' });

      res.json({
        message: 'Self-destruct sequence initiated',
        confirmationCode,
        status: 'Destroyed'
      });
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  }
);

module.exports = router; 