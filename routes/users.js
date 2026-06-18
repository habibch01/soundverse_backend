const express    = require('express');
const router     = express.Router();
const { ClerkExpressRequireAuth, clerkClient } = require('@clerk/clerk-sdk-node');
const requireAdmin = require('../middlewares/requireAdmin');

// GET all users (admin only)
router.get('/', ClerkExpressRequireAuth(), requireAdmin, async (req, res) => {
  try {
    const { data } = await clerkClient.users.getUserList({ limit: 100 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update user role (admin only)
router.put('/:userId/role', ClerkExpressRequireAuth(), requireAdmin, async (req, res) => {
  try {
    const user = await clerkClient.users.updateUser(req.params.userId, {
      publicMetadata: { role: req.body.role }
    });
    res.json({ message: 'Role updated', userId: user.id });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE user (admin only)
router.delete('/:userId', ClerkExpressRequireAuth(), requireAdmin, async (req, res) => {
  try {
    await clerkClient.users.deleteUser(req.params.userId);
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;