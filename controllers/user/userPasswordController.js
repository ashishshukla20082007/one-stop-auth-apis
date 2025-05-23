const asyncHandler = require("express-async-handler");
const User = require('../../models/user/userModel');  
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const axios = require('axios');

const userForgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      // 1. Generate a random token
      const rawToken = crypto.randomBytes(32).toString('hex');
  
      // 2. Hash the token using bcrypt
      const hashedToken = await bcrypt.hash(rawToken, 10);
  
      // 3. Store hashed token and expiry in DB
      user.resetToken = hashedToken;
      user.resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour
      await user.save();
  
      // 4. Send raw token (not hashed) in reset link
      const resetLink = `http://localhost:5001/api/v1/auth/reset-password/${encodeURIComponent(rawToken)}`;
      
      // 5. Send notification through notification service
      await axios.post('http://localhost:5002/notify/email', {
        userId: user._id,
        to: user.email,
        subject: 'Password Reset',
        text: `<p>Click <a href="${resetLink}">here</a> to reset your password. The link is valid for 1 hour.</p>`
      });
      
      res.status(200).json({ message: 'Password reset email sent' });

    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Failed to send password reset email' });
    }
});

const userResetPassword = asyncHandler(async (req, res) => {
    const { token } = req.params;
    const { newPassword } = req.body;
  
    try {
      const users = await User.find({
        resetTokenExpiry: { $gt: Date.now() }
      });
  
      const user = users.find(u => bcrypt.compareSync(token, u.resetToken));
  
      if (!user) {
        return res.status(400).json({ message: 'Invalid or expired token' });
      }
  
      user.password = await bcrypt.hash(newPassword, 10);
      user.resetToken = undefined;
      user.resetTokenExpiry = undefined;
      await user.save();
  
      res.json({ message: 'Password reset successful' });
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Something went wrong' });
    }
});

module.exports = {
    userForgotPassword,
    userResetPassword
};