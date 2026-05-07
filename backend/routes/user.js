const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/auth');

// GET /api/user/profile
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate('bookmarks')
      .populate('cart.course')
      .select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// PUT /api/user/bookmarks
router.put('/bookmarks', auth, async (req, res) => {
  try {
    const { courseId } = req.body;
    const user = await User.findById(req.user.id);

    const index = user.bookmarks.indexOf(courseId);
    if (index === -1) {
      user.bookmarks.push(courseId); // add bookmark
    } else {
      user.bookmarks.splice(index, 1); // remove bookmark
    }

    await user.save();
    
    // Return populated bookmarks
    const updatedUser = await User.findById(req.user.id).populate('bookmarks');
    res.json(updatedUser.bookmarks);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// PUT /api/user/cart
router.put('/cart', auth, async (req, res) => {
  try {
    const { courseId, action } = req.body; // action: 'add' or 'remove'
    const user = await User.findById(req.user.id);

    const cartItemIndex = user.cart.findIndex(item => item.course.toString() === courseId);

    if (action === 'add') {
      if (cartItemIndex === -1) {
        user.cart.push({ course: courseId, quantity: 1 });
      }
    } else if (action === 'remove') {
      if (cartItemIndex !== -1) {
        user.cart.splice(cartItemIndex, 1);
      }
    }

    await user.save();
    
    // Return populated cart
    const updatedUser = await User.findById(req.user.id).populate('cart.course');
    res.json(updatedUser.cart);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
