const { clerkClient } = require('@clerk/clerk-sdk-node');

const requireAdmin = async (req, res, next) => {
  let role = req.auth?.sessionClaims?.publicMetadata?.role
    ?? req.auth?.sessionClaims?.public_metadata?.role
    ?? req.auth?.user?.publicMetadata?.role;

  if (!role && req.auth?.userId) {
    try {
      const user = await clerkClient.users.getUser(req.auth.userId);
      role = user?.publicMetadata?.role ?? user?.public_metadata?.role;
    } catch (err) {
      console.error('Failed to fetch Clerk user for admin check:', err);
    }
  }

  console.log('Extracted admin role:', role);

  if (role !== 'admin') {
    console.error('Admin access denied. User role:', role);
    return res.status(403).json({ error: 'Admin access required' });
  }

  next();
};

module.exports = requireAdmin;
