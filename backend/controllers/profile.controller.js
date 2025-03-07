const User = require('../models/User');

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: 'User not found.' });
    res.status(200).json({ data: user });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch profile.' });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { firstName, lastName, phoneNumber } = req.body;
    const updatedData = {
      firstName,
      lastName,
      phoneNumber,
    };

    if (req.file) {
      updatedData.profilePicture = `/uploads/${req.file.filename}`;
    }

    const user = await User.findByIdAndUpdate(
      req.userId,
      { $set: updatedData },
      { new: true }
    );

    if (!user) return res.status(404).json({ message: 'User not found.' });
    res.status(200).json({ data: user });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update profile.' });
  }
};
