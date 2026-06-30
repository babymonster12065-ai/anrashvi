const contactService = require('../services/contactService');

const submitContactForm = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      res.status(400);
      throw new Error('Please provide all fields');
    }

    await contactService.createContactMessage({ name, email, subject, message });

    res.status(201).json({
      success: true,
      message: 'Message sent successfully!',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  submitContactForm,
};
